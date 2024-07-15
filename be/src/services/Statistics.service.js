import getCurrentUser from "../utils/getCurrentUser.js";
import HousesModel from "../models/Houses.model.js";
import RoomsModel from "../models/Rooms.model.js";
import BillsModel from "../models/Bills.model.js";
import ProblemsModel from "../models/Problems.model.js";
import prisma from "../utils/prismaClient.js";
const statisticsService = {
    statisticGeneral: async (req) => {
        try {
            const currentUserId = getCurrentUser(req);

            // Fetch all houses for the current user
            const houses = await prisma.house.findMany({
                where: {
                    hostId: currentUserId,
                    deleted: false,
                },
            });

            const houseNumber = houses.length;

            let roomNumber = 0;
            let roomNumberEmpty = 0;

            for (const house of houses) {
                const rooms = await prisma.room.findMany({
                    where: {
                        houseId: house.id,
                        deleted: false,
                    },
                });
                roomNumber += rooms.length;

                const emptyRoomsCount = await prisma.room.count({
                    where: {
                        houseId: house.id,
                        deleted: false,
                        members: {
                            none: {},
                        },
                    },
                });
                roomNumberEmpty += emptyRoomsCount;
            }

            return {
                houseNumber: houseNumber,
                roomNumber: roomNumber,
                roomNumberNotEmpty: roomNumber - roomNumberEmpty,
                roomNumberEmpty: roomNumberEmpty,
            };
        } catch (error) {
            throw error;
        }
    },
    statisticAllBills: async (req) => {
        try {
            const currentUserId = getCurrentUser(req);
            const { month } = req.query;

            // Fetch houses hosted by the current user
            const houses = await prisma.house.findMany({
                where: {
                    hostId: currentUserId,
                    deleted: false,
                },
            });

            let billIsPaid = 0;
            let totalBillIsPaid = 0;
            let billIsNotPaid = 0;
            let totalBillIsNotPaid = 0;

            if (month) {
                const [mm, yyyy] = month.split("-");
                const startOfMonth = new Date(yyyy, mm - 1, 1);
                const endOfMonth = new Date(yyyy, mm, 0);

                for (const house of houses) {
                    const bills = await prisma.bill.findMany({
                        where: {
                            room: {
                                houseId: house.id,
                            },
                            createdAt: {
                                gte: startOfMonth,
                                lt: endOfMonth,
                            },
                        },
                    });

                    for (const bill of bills) {
                        if (bill.isPaid) {
                            billIsPaid += 1;
                            totalBillIsPaid += bill.total;
                        } else {
                            billIsNotPaid += 1;
                            totalBillIsNotPaid += bill.total;
                        }
                    }
                }
            } else {
                for (const house of houses) {
                    const bills = await prisma.bill.findMany({
                        where: {
                            houseId: house.id,
                        },
                    });

                    for (const bill of bills) {
                        if (bill.isPaid) {
                            billIsPaid += 1;
                            totalBillIsPaid += bill.total;
                        } else {
                            billIsNotPaid += 1;
                            totalBillIsNotPaid += bill.total;
                        }
                    }
                }
            }

            return {
                billIsPaid,
                billIsNotPaid,
                totalBillIsPaid,
                totalBillIsNotPaid,
            };
        } catch (error) {
            throw error;
        }
    },
    statisticProblem: async (req) => {
        try {
            const currentUserId = getCurrentUser(req);
            const { month } = req.query;

            // Fetch houses hosted by the current user
            const houses = await prisma.house.findMany({
                where: {
                    hostId: currentUserId,
                    deleted: false,
                },
            });

            let numberProblemNone = 0;
            let numberProblemDoing = 0;
            let numberProblemDone = 0;

            if (month) {
                const [mm, yyyy] = month.split("-");
                const startOfMonth = new Date(yyyy, mm - 1, 1);
                const endOfMonth = new Date(yyyy, mm, 0);

                for (const house of houses) {
                    const problemsNone = await prisma.problem.count({
                        where: {
                            room: {
                                houseId: house.id,
                            },
                            status: "none",
                            deleted: false,
                            createdAt: {
                                gte: startOfMonth,
                                lt: endOfMonth,
                            },
                        },
                    });
                    numberProblemNone += problemsNone;

                    const problemsDoing = await prisma.problem.count({
                        where: {
                            room: {
                                houseId: house.id,
                            },
                            status: "doing",
                            deleted: false,
                            createdAt: {
                                gte: startOfMonth,
                                lt: endOfMonth,
                            },
                        },
                    });
                    numberProblemDoing += problemsDoing;

                    const problemsDone = await prisma.problem.count({
                        where: {
                            room: {
                                houseId: house.id,
                            },
                            status: "done",
                            deleted: false,
                            createdAt: {
                                gte: startOfMonth,
                                lt: endOfMonth,
                            },
                        },
                    });
                    numberProblemDone += problemsDone;
                }
            } else {
                for (const house of houses) {
                    const problemsNone = await prisma.problem.count({
                        where: {
                            room: {
                                houseId: house.id,
                            },
                            status: "none",
                            deleted: false,
                        },
                    });
                    numberProblemNone += problemsNone;

                    const problemsDoing = await prisma.problem.count({
                        where: {
                            room: {
                                houseId: house.id,
                            },
                            status: "doing",
                            deleted: false,
                        },
                    });
                    numberProblemDoing += problemsDoing;

                    const problemsDone = await prisma.problem.count({
                        where: {
                            room: {
                                houseId: house.id,
                            },
                            status: "done",
                            deleted: false,
                        },
                    });
                    numberProblemDone += problemsDone;
                }
            }

            return {
                numberProblemNone,
                numberProblemDoing,
                numberProblemDone,
            };
        } catch (error) {
            throw error;
        }
    },
    statisticRevenue: async (req) => {
        try {
            const currentUserId = getCurrentUser(req);

            // Fetch houses hosted by the current user
            const houses = await prisma.house.findMany({
                where: {
                    hostId: currentUserId,
                    deleted: false,
                },
            });

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();

            const revenueByMonth = {};

            // Initialize revenueByMonth object for all 12 months
            for (let i = 1; i <= 12; i++) {
                revenueByMonth[`${i}`] = 0;
            }

            for (const house of houses) {
                const bills = await prisma.bill.findMany({
                    where: {
                        room: {
                            houseId: house.id,
                        },
                        isPaid: true,
                        createdAt: {
                            gte: new Date(currentYear, 0, 1), // Start from the beginning of the current year
                            lte: currentDate, // Up to the current date
                        },
                    },
                });

                for (const bill of bills) {
                    const createdAt = new Date(bill.createdAt);
                    const month = createdAt.getMonth() + 1; // Month is zero-based in JavaScript
                    const key = `${month}`;

                    revenueByMonth[key] += bill.total; // Aggregate revenue for each month
                }
            }

            return {
                year: currentYear,
                revenueByMonth,
            };
        } catch (error) {
            throw error;
        }
    },
};

export default statisticsService;
