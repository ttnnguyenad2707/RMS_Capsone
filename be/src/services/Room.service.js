import exceljs from "exceljs";
import Rooms from "../models/Rooms.model.js";
import HousesModel from "../models/Houses.model.js";
import AccountModel from "../models/Account.model.js";
import bcrypt from "bcrypt";
import Image from "../models/Upload.model.js";
import { v2 as cloudinary } from "cloudinary";
import BillsModel from "../models/Bills.model.js";
import prisma from "../utils/prismaClient.js";

const RoomService = {
    addRoom: async (req) => {
        try {
            const { houseId } = req.body;
            const house = await prisma.house.findUnique({
                where: { id: parseInt(houseId) },
                include: {
                    housedefaultutilities: true,
                    houseotherutilities: true,
                },
            });

            if (!house) {
                throw new Error(`House with ID ${houseId} not found.`);
            }

            const workbook = new exceljs.Workbook();
            const buffer = req.file.buffer;
            await workbook.xlsx.load(buffer);
            const worksheet = workbook.worksheets[0];

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("Rms@12345", salt);

            const existingRooms = await prisma.room.findMany({
                where: { houseId: parseInt(houseId), deleted: false },
            });
            const existingRoomNames = existingRooms.map((room) => room.name);
            console.log(existingRoomNames);

            for (
                let rowNumber = 1;
                rowNumber <= worksheet.rowCount;
                rowNumber++
            ) {
                const row = worksheet.getRow(rowNumber);
                if (rowNumber !== 1 && row.getCell(1).value) {
                    const roomName = row.getCell(1).value.toString().trim();
                    if (existingRoomNames.includes(roomName)) {
                        throw new Error(`Phòng "${roomName}" đã tồn tại.`);
                    }
                }
            }

            for (
                let rowNumber = 1;
                rowNumber <= worksheet.rowCount;
                rowNumber++
            ) {
                const row = worksheet.getRow(rowNumber);
                if (rowNumber !== 1 && row.getCell(1).value) {
                    const roomName = row.getCell(1).value.toString().trim();
                    const floor = parseInt(roomName.charAt(0));

                    if (!existingRoomNames.includes(roomName)) {
                        const rowData = await prisma.room.create({
                            data: {
                                floor: floor,
                                name: roomName,
                                status: row.getCell(2).value,
                                quantityMember: row.getCell(3).value,
                                roomType: row.getCell(4).value,
                                roomPrice: parseFloat(row.getCell(5).value),
                                deposit: parseFloat(row.getCell(6).value),
                                area: parseInt(row.getCell(7).value),
                                house: { connect: { id: parseInt(houseId) } },
                                createdAt: new Date(),
                                updatedAt: new Date(),
                            },
                        });

                        await prisma.account.create({
                            data: {
                                username:
                                    house.name.replace(/\s/g, "") + roomName,
                                password: hashedPassword,
                                accountType: "renter",
                                roomId: rowData.id,
                                status: false,
                            },
                        });
                    }
                }
            }
            return { message: "oke" };
        } catch (error) {
            throw new Error(error.toString());
        }
    },

    addOne: async (req) => {
        try {
            const { houseId } = req.params;
            const house = await prisma.house.findUnique({
                where: { id: parseInt(houseId) },
                include: {
                    housedefaultutilities: true,
                    houseotherutilities: true,
                },
            });

            if (!house) {
                throw new Error(`House with ID ${houseId} not found.`);
            }

            const existingRoom = await prisma.room.findFirst({
                where: {
                    houseId: parseInt(houseId),
                    name: req.body.name.trim(),
                    deleted: false,
                },
            });

            if (existingRoom) {
                throw new Error("Phòng đã tồn tại. Vui lòng chọn tên khác.");
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("Rms@12345", salt);

            const createdRoom = await prisma.room.create({
                data: {
                    houseId: parseInt(houseId),
                    floor: req.body.floor,
                    name: req.body.name.trim(),
                    status: req.body.status,
                    quantityMember: req.body.quantityMember,
                    roomType: req.body.roomType,
                    roomPrice: req.body.roomPrice,
                    deposit: req.body.deposit,
                    area: req.body.area,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    roomdefaultutilities: {
                        create: req.body.utilities.map((utilId) => ({
                            defaultutilities: {
                                connect: { id: parseInt(utilId) },
                            },
                        })),
                    },
                    roomotherutilities: {
                        create: req.body.otherUtilities.map((utilId) => ({
                            otherutilities: {
                                connect: { id: parseInt(utilId) },
                            },
                        })),
                    },
                },
            });

            await prisma.account.create({
                data: {
                    username: house.name.replace(/\s/g, "") + req.body.name,
                    password: hashedPassword,
                    accountType: "renter",
                    roomId: createdRoom.id,
                    status: false,
                },
            });

            return createdRoom;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    getRooms: async (req) => {
        try {
            const { houseId } = req.params;
            const {
                page,
                limit,
                option,
                floor,
                name,
                status,
                quantityMember,
                roomType,
                area,
            } = req.query;
            const pageNumber = parseInt(page) || 1;
            const limitPerPage = parseInt(limit) || 10;
            const skip = (pageNumber - 1) * limitPerPage;

            const where = {
                houseId: parseInt(houseId),
                deleted: false,
                ...(floor && { floor: parseInt(floor) }),
                ...(name && { name }),
                ...(status && { status }),
                ...(area && { area: parseInt(area) }),
            };

            const totalRooms = await prisma.room.count({ where });
            const totalPages = Math.ceil(totalRooms / limitPerPage);

            let data;
            if (String(option) === "all") {
                data = await prisma.room.findMany({
                    where,
                    orderBy: { createdAt: "desc" },
                    include: {
                        house: true,members: true,house: {include:{pricelistitem:true,pricelistitem: {include: {defaultprice:true}}}}
                    },
                });
                return data;
            } else {
                data = await prisma.room.findMany({
                    where,
                    skip,
                    take: limitPerPage,
                    orderBy: { createdAt: "desc" },
                    include: {
                        house: true,members: true,house: {include:{pricelistitem:true,pricelistitem: {include: {defaultprice:true}}}}
                    },
                });
                return {
                    pagination: {
                        currentPage: pageNumber,
                        totalPages: totalPages,
                        totalRooms: totalRooms,
                        roomsPerPage: data.length,
                    },
                    room: data,
                };
            }
        } catch (error) {
            console.error(error);
            throw new Error(error.toString());
        }
    },
    getOne: async (req) => {
        try {
            const { roomId } = req.params;
            const room = await prisma.room.findUnique({
                where: {
                    id: parseInt(roomId),
                },
                include: {
                    roomdefaultutilities: true, // assuming you have a relation defined for utilities
                    roomotherutilities: true, // assuming you have a relation defined for otherUtilities
                    house: {
                        include: {
                            pricelistitem: {
                                include: {
                                    defaultprice: true,
                                },
                            },
                        },
                    },
                    members: true,
                },
            });

            if (!room) {
                return {
                    error: "Room not found",
                    status: 404,
                };
            }

            return {
                ...room,
                currentMember: room.members.length,
            };
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    updateOne: async (req) => {
        try {
            const { roomId } = req.params;

            // Update the room with the new data from req.body
            const updatedRoom = await prisma.room.update({
                where: {
                    id: parseInt(roomId),
                },
                data: {
                    ...req.body,
                    updatedAt: new Date(), // update the updatedAt field
                },
            });

            return updatedRoom;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    deleteOne: async (req) => {
        try {
            const { roomId } = req.params;

            // Update the room to mark it as deleted
            const updatedRoom = await prisma.room.update({
                where: {
                    id: parseInt(roomId),
                },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });

            // Delete the associated account
            await prisma.account.deleteMany({
                where: {
                    roomId: parseInt(roomId),
                },
            });

            return updatedRoom;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    getFloor: async (req) => {
        try {
            const { houseId } = req.params;

            // Fetch all rooms with the given houseId and deleted is false
            const rooms = await prisma.room.findMany({
                where: {
                    houseId: parseInt(houseId),
                    deleted: false,
                },
                select: {
                    floor: true,
                },
            });

            // Extract distinct floor values
            const floors = [...new Set(rooms.map((room) => room.floor))];

            return floors;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    addMember: async (req) => {
        try {
            const { roomId } = req.params;
            const { phone, cccd, ...memberData } = req.body;

            // Check if room exists
            const room = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                include: { members: true },
            });

            if (!room) {
                throw new Error("Room not found.");
            }

            // Check if a member with the same phone or CCCD already exists
            const existingMember = room.members.find(
                (member) => member.phone === phone || member.cccd === cccd
            );

            if (existingMember) {
                throw new Error(
                    "Số điện thoại hoặc số CCCD đã tồn tại trong phòng."
                );
            }

            // Handle image upload
            let imageData;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageData = result.secure_url;
            } else {
                imageData =
                    "https://quanlynhatro.com/frontend3/assets/img/placeholder.png";
            }

            // Create a new member
            const newMember = await prisma.members.create({
                data: {
                    ...memberData,
                    phone,
                    cccd,
                    avatar: imageData,
                    roomId: parseInt(roomId),
                },
            });

            return newMember;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    removeMember: async (req) => {
        try {
            const { roomId } = req.params;
            const { memberId } = req.params;

            // Check if room exists
            const room = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                include: { members: true },
            });

            if (!room) {
                throw new Error("Room not found.");
            }

            // Check if member exists in the room
            const memberExists = room.members.some(
                (member) => member.id === parseInt(memberId)
            );

            if (!memberExists) {
                throw new Error("Member not found in the room.");
            }

            // Remove the member from the room
            await prisma.members.update({
                where: { id: parseInt(memberId) },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });

            // Retrieve the updated room
            const updatedRoom = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                include: { members: true },
            });

            return updatedRoom;
        } catch (error) {
            throw new Error(error.toString());
        }
    },
    updateMember: async (req) => {
        try {
            const { roomId } = req.params;
            const { memberId, ...updateInfo } = req.body;

            // Fetch the room including its members
            const room = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                include: {
                    members: {
                        where: { id: parseInt(memberId) },
                    },
                },
            });

            if (!room || room.members.length === 0) {
                throw new Error("Member not found in the room");
            }

            // Handle image upload if a file is provided
            let imageData;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageData = result.secure_url;
            }

            // Update the member details including the avatar if imageData is available
            const updatedMember = await prisma.members.update({
                where: { id: parseInt(memberId) },
                data: {
                    ...updateInfo,
                    avatar: imageData,
                },
            });

            return updatedMember;
        } catch (error) {
            throw error;
        }
    },
    getMember: async (req) => {
        try {
            const { roomId, memberId } = req.params;

            // Fetch the room and include its members
            const room = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                
            });

            // Check if the room exists
            if (!room) {
                throw new Error("Room not found");
            }

            // Find the member in the room's members array
            const member = await prisma.members.findUnique({
                where: { id: parseInt(memberId) },
                include: { room: true },
            });
            
            // Check if the member exists
            if (!member) {
                throw new Error("Member not found in the room");
            }

            return member;
        } catch (error) {
            throw error;
        }
    },
    countRoomsByMembership: async (req) => {
        try {
            const { houseId } = req.params;
            
            // Fetch all rooms with their members for the given houseId
            const rooms = await prisma.room.findMany({
                where: {
                    houseId: parseInt(houseId),
                    deleted: false,
                },
                include: {
                    members: true,
                },
            });
    
            let countWithMembers = 0;
            let countWithoutMembers = 0;
    
            rooms.forEach((room) => {
                if (room.members && room.members.length > 0) {
                    countWithMembers++;
                } else {
                    countWithoutMembers++;
                }
            });
    
            return {
                totalRooms: rooms.length,
                withMembers: countWithMembers,
                withoutMembers: countWithoutMembers,
            };
        } catch (error) {
            throw error;
        }
    },
    getRoomWithBills: async (req) => {
        try {
            const { houseId } = req.params;
            const { month } = req.query;
            const rooms = await prisma.room.findMany({
                where: {
                    houseId: parseInt(houseId),
                    deleted: false
                },
                include: {
                    house: {
                        select: {
                            id:true,
                            name: true
                        }
                    },
                    members: true
                },
            });
    
            const newData = [];
    
            for (let room of rooms) {
                let bill = null;
                if (month) {
                    const [mm, yyyy] = month.split("-");
                    const startOfMonth = new Date(yyyy, mm - 1, 1);
                    const endOfMonth = new Date(yyyy, mm, 0);
    
                    bill = await prisma.bill.findFirst({
                        where: {
                            roomId: room.id,
                            createdAt: {
                                gte: startOfMonth,
                                lt: endOfMonth
                            }
                        }
                    });
                } else {
                    bill = await prisma.bill.findFirst({
                        where: {
                            roomId: room.id,
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    });
                }
                newData.push({
                    room: room,
                    bill: bill || null
                });
            }
            return newData;
        } catch (error) {
            throw error;
        }
    },
};

export default RoomService;
