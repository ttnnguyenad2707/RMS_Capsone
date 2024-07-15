import AccountModel from "../models/Account.model.js";
import BillsModel from "../models/Bills.model.js";
import Notification from "../models/Notification.model.js";
import RoomsModel from "../models/Rooms.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import PayOS from "@payos/node";
import * as dotenv from "dotenv";
dotenv.config();
import prisma from "../utils/prismaClient.js";
const { CLIENT_URL } = process.env;

const BillService = {
    getDebtOfRoom: async (req) => {
        try {
            const { roomId } = req.params;

            const unpaidBills = await prisma.bill.findMany({
                where: {
                    roomId: parseInt(roomId),
                    isPaid: false,
                },
                select: {
                    total: true,
                },
            });

            const totalDebt = unpaidBills.reduce(
                (acc, bill) => acc + bill.total,
                0
            );

            return {
                debt: totalDebt,
            };
        } catch (error) {
            throw error;
        }
    },
    addBillInRoom: async (req) => {
        try {
            const { roomId } = req.params;
            const currentUserId = getCurrentUser(req);

            const room = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                include: {
                    house: {
                        include: {
                            pricelistitem: {
                                include: { defaultprice: true },
                            },
                        },
                    },
                    members: true,
                },
            });

            if (!room || room.members.length === 0) {
                throw new Error(
                    `Phòng ${room.name} chưa có người ở không thể tạo hoá đơn`
                );
            }

            const thisMonth = new Date().getMonth();
            const thisYear = new Date().getFullYear();
            const existingBill = await prisma.bill.findFirst({
                where: {
                    roomId: parseInt(roomId),
                    createdAt: {
                        gte: new Date(thisYear, thisMonth, 1),
                        lt: new Date(thisYear, thisMonth + 1, 1),
                    },
                },
            });

            if (existingBill) {
                throw new Error(
                    `Hóa đơn cho phòng này trong tháng này đã tồn tại.`
                );
            }

            const { priceList, note } = req.body;
            const oldBill = await prisma.bill.findMany({
                where: { roomId: parseInt(roomId), isPaid: false },
            });
            const listDebt = oldBill.map((bill) => bill.total);
            let debt =
                listDebt.length > 0
                    ? listDebt.reduce((debt, item) => debt + item)
                    : 0;

            let priceListForBill = [];
            for (const item of priceList) {
                const baseId = parseInt(item.base);
                const base = await prisma.defaultprice.findUnique({
                    where: { id: baseId },
                });
                if (!base) {
                    throw new Error(`Không tìm thấy đơn giá có id ${baseId}`);
                }
                let totalUnit = 0;
                if (base.unit === "DONG_PER_MONTH") {
                    totalUnit = item.unitPrice;
                } else if (["DONG_PER_kWh", "DONG_PER_BLOCK"].includes(base.unit)) {
                    // Assume default values for startUnit and endUnit
                    const startUnit = item.startUnit || 0;
                    const endUnit = item.endUnit || 30;
                    totalUnit = (endUnit - startUnit) * item.unitPrice;
                } else if (base.unit === "DONG_PER_PERSON") {
                    totalUnit = item.unitPrice * room.members.length;
                }

                priceListForBill.push({
                    base: baseId,
                    unit: item.unitPrice,
                    startUnit: item.startUnit || 0, // Default value if not provided
                    endUnit: item.endUnit || 30, // Default value if not provided
                    totalUnit: totalUnit,
                });
            }

            const totalUnits = priceListForBill.reduce(
                (total, item) => total + item.totalUnit,
                0
            );
            const billData = {
                roomId: parseInt(roomId),
                roomPrice: room.roomPrice,
                debt: debt,
                total: room.roomPrice + totalUnits + debt,
                note: note,
            };
            await prisma.bill.updateMany({
                where: { roomId: parseInt(roomId), isPaid: false },
                data: {
                    isPaid: true,
                },
            });
            const bill = await prisma.bill.create({
                data: billData,
            });

            await prisma.priceitembill.createMany({
                data: priceListForBill.map((item) => ({
                    billId: bill.id,
                    base: parseInt(item.base),
                    unitPrice: item.unit,
                    startUnit: item.startUnit,
                    endUnit: item.endUnit,
                    totalUnit: item.totalUnit,
                })),
            });

            const account = await prisma.account.findUnique({
                where: { id: currentUserId },
                include: {
                    paymentgateway: true,
                },
            });

            let paymentLink;
            if (
                account.paymentgateway.clientId &&
                account.paymentgateway.APIKey &&
                account.paymentgateway.checksum
            ) {
                const payos = new PayOS(
                    account.paymentgateway.clientId,
                    account.paymentgateway.APIKey,
                    account.paymentgateway.checksum
                );
                const orderCode = Date.now();
                const requestData = {
                    orderCode: Number(orderCode),
                    amount: room.roomPrice + totalUnits + debt,
                    description: `Thanh toán tiền phòng ${room.name}`,
                    cancelUrl: `http://localhost:5173/${bill.id}`,
                    returnUrl: `http://localhost:5173/billsuccess/${bill.id}`,
                };
                try {
                    paymentLink = await payos.createPaymentLink(requestData);
                } catch (error) {
                    await prisma.bill.delete({ where: { id: bill.id } });
                    throw new Error("Thông tin ngân hàng không hợp lệ");
                }
            } else {
                await prisma.bill.delete({ where: { id: bill.id } });
                throw new Error("Thêm thông tin ngân hàng để tạo hoá đơn");
            }

            const finalBill = await prisma.bill.update({
                where: { id: bill.id },
                data: { paymentLink: paymentLink.checkoutUrl },
                include: {
                    priceitembill: true,
                },
            });

            const roomAccount = await prisma.account.findUnique({
                where: { roomId: parseInt(roomId) },
            });

            await prisma.notification.create({
                data: {
                    sender: currentUserId,
                    recipients: {
                        create: [
                            {
                                userId: roomAccount.id,
                                isRead: false,
                            },
                        ],
                    },
                    message: `Một hoá đơn phòng ${room.name} đã được tạo`,
                    type: "bill",
                    link: `${CLIENT_URL}/bill/${bill.id}`,
                },
            });

            return finalBill;
        } catch (error) {
            throw error;
        }
    },
    getBill: async (req) => {
        try {
            const { billId } = req.params;

            const bill = await prisma.bill.findUnique({
                where: {
                    id: parseInt(billId),
                },
                include: {
                    room: {
                        select: {
                            name: true,
                        },
                    },
                    priceitembill: {
                        include: {
                            defaultprice: true,
                        },
                    },
                },
            });

            if (!bill) {
                throw new Error("Bill not found");
            }

            return bill;
        } catch (error) {
            throw error;
        }
    },
    getBills: async (req) => {
        try {
            const { roomId, option, houseId } = req.query;

            const query = {};

            if (roomId) {
                query.roomId = parseInt(roomId);
            }

            if (houseId) {
                query.houseId = parseInt(houseId);
            }

            const bills = await prisma.bill.findMany({
                where: query,
                include: {
                    room: {
                        select: {
                            name: true,
                        },
                    },
                    priceitembill: {
                        include: {
                            defaultprice: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return bills;
        } catch (error) {
            throw error;
        }
    },
    confirmBills: async (req) => {
        try {
            const { billId } = req.params;
            const { paymentMethod } = req.body;

            const bill = await prisma.bill.findUnique({
                where: { id: parseInt(billId) },
                include: {
                    room: { select: { name: true } },
                    priceitembill: { include: { defaultprice: true } },
                },
            });

            if (!bill) {
                throw new Error("Bill not found");
            }

            if (bill.isPaid) {
                return { message: "Bill đã thanh toán rồi !!" };
            } else {
                await prisma.bill.update({
                    where: { id: parseInt(billId) },
                    data: {
                        isPaid: true,
                        paymentMethod,
                    },
                });
            }

            const roomAccount = await prisma.account.findFirst({
                where: { roomId: bill.roomId },
            });

            if (!roomAccount) {
                throw new Error("Room account not found");
            }

            const currentUser = getCurrentUser(req);

            await prisma.notification.create({
                data: {
                    sender: currentUser,
                    message: `Hoá đơn đã được xác nhận thanh toán bằng ${
                        paymentMethod === "Cash"
                            ? " Tiền mặt"
                            : paymentMethod === "Banking"
                            ? "Chuyển khoản"
                            : ""
                    }`,
                    type: "bill",
                    link: `${CLIENT_URL}/bill/${bill.id}`,
                    recipients: {
                        create: [
                            {
                                userId: roomAccount.id,
                                isRead: false,
                            },
                        ],
                    },
                },
            });

            return bill;
        } catch (error) {
            throw error;
        }
    },
};
export default BillService;
