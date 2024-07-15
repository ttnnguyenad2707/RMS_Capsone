import AccountModel from "../models/Account.model.js";
import HousesModel from "../models/Houses.model.js";
import NewsModel from "../models/News.model.js";
import Notification from "../models/Notification.model.js";
import ProblemsModel from "../models/Problems.model.js";
import RoomsModel from "../models/Rooms.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import getPaginationData from "../utils/getPaginationData.js";
import * as dotenv from 'dotenv'
import prisma from "../utils/prismaClient.js";
dotenv.config();
const {CLIENT_URL} = process.env

const ProblemService = {
    addOne: async(req) => {
        try {
            const { roomId, title, content, type, status } = req.body;
            const creatorId = getCurrentUser(req);
    
            // Fetch the room with houseId and hostId
            const room = await prisma.room.findUnique({
                where: { id: parseInt(roomId) },
                include: {
                    house: {
                        select: {
                            hostId: true,
                        },
                    },
                },
            });
    
            if (!room) {
                throw new Error("Room not found");
            }
    
            // Create the problem
            const data = await prisma.problem.create({
                data: {
                    title,
                    content,
                    type,
                    status,
                    roomId: parseInt(roomId),
                    creatorId: parseInt(creatorId),
                },
            });
    
            // Create the notification
            const roomAccount = await prisma.account.findUnique({
                where: { id: room.house.hostId },
            });
    
            if (roomAccount) {
                await prisma.notification.create({
                    data: {
                        sender: creatorId,
                        recipients: {
                            create: [
                                {
                                    userId: room.house.hostId,
                                    isRead: false,
                                },
                            ],
                        },
                        message: `1 problem đã được thêm vào phòng ${room.name}`,
                        type: 'problem',
                        link: `${CLIENT_URL}/problem/${data.id}`,
                    },
                });
            }
    
            return data;
        } catch (error) {
            throw error;
        }
    },/*  */
    getInHouse: async (req) => {
        try {
            const { houseId } = req.params;
            const problems = await prisma.problem.findMany({
                where: {
                    room: {
                        houseId: parseInt(houseId)
                    },
                    deleted:false
                },
                include: {
                    account: true, // Include account details of the creator
                    room: true // Include room details
                },
                orderBy: {
                    createdAt: 'desc' // Order by createdAt descending
                }
            });
    
            return problems;
        } catch (error) {
            throw error;
        }
        
    },
    getByFilter: async(req) => {
        try {
            const { roomId } = req.params;
            const { page = 1, limit = 10, type, status, title, content } = req.query;
    
            let filter = {
                roomId: parseInt(roomId),
                deleted: false, // Exclude deleted problems
            };
    
            if (type) {
                filter.type = type;
            }
            if (status) {
                filter.status = status;
            }
            if (title) {
                filter.title = {
                    contains: title,
                };
            }
            if (content) {
                filter.content = {
                    contains: content,
                };
            }
    
            const populateFields = ['account', 'room']; // Adjust based on your schema
    
            const data = await getPaginationData(prisma.problem, page, limit, filter, populateFields);
    
            return data;
        } catch (error) {
            throw error;
        }

    },
    getInRoom: async(req) => {
        try {
            const {houseId} = req.params;
            const problems = ProblemsModel.find({houseId});
            return problems;
        } catch (error) {
            throw error
        }
    },
    getOne: async (req) => {
        try {
            const { problemId } = req.params;
    
            const data = await prisma.problem.findUnique({
                where: {
                    id: parseInt(problemId),
                },
                include: {
                    account: true,
                    room: true,
                },
            });
    
            return data;
        } catch (error) {
            throw error;
        }
    },
    updateOne: async (req) => {
        try {
            const { problemId } = req.params;
            const newData = await prisma.problem.update({
                where: {
                    id: parseInt(problemId),
                },
                data: {
                    ...req.body,
                },
                include: {
                    room: true,
                    account: true,
                },
            });
    
            // Fetch room account
            const roomAccount = await prisma.account.findFirst({
                where: {
                    roomId: newData.roomId,
                },
            });
    
            // Fetch room
            const room = await prisma.room.findUnique({
                where: {
                    id: newData.roomId,
                },
            });
    
            // Create notification
            await prisma.notification.create({
                data: {
                    sender: getCurrentUser(req),
                    recipients: {
                        create: [
                            {
                                userId: roomAccount.id,
                                isRead: false,
                            },
                        ],
                    },
                    message: `Problem phòng ${room.name} đã được cập nhật`,
                    type: "problem",
                    link: `${CLIENT_URL}/problem/${newData.id}`,
                },
            });
    
            return newData;
        } catch (error) {
            throw error;
        }
    },
    deleteOne: async (req) => {
        try {
            const { problemId } = req.params;
            const deletedProblem = await prisma.problem.update({
                where: {
                    id: parseInt(problemId),
                },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });
    
            return deletedProblem;
        } catch (error) {
            throw error;
        }
    },
    resetProblem: async (req) => {
        try {
            await NewsModel.deleteMany({deleted:true})
            return "xoas thanhf coong"
        } catch (error) {
            throw error
        }
    }
    // resetProblem: async (req) => {
    //     try {
    //         const accounts = await AccountModel.find();
    
    //         for (const account of accounts) {
    //             const roomExists = await RoomsModel.exists({ _id: account.roomId });
    //             if (!roomExists) {
    //                 await AccountModel.deleteOne({ _id: account._id });
    //             }
    //         }
    
    //         return "Xoá thành công.";
    //     } catch (error) {
    //         throw error;
    //     }
    // },
    // resetProblem: async (req) => {
    //     try {
    //         const rooms = await RoomsModel.find();
    
    //         for (const room of rooms) {
    //             const houseExists = await HousesModel.exists({ _id: room.houseId });
    //             if (!houseExists) {
    //                 // Xoá phòng không có houseId tồn tại trong houseModel
    //                 await RoomsModel.deleteOne({ _id: room._id });
    //             }
    //         }
    
    //         return "Xoá thành công các phòng không liên kết với nhà.";
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    
    
}

export default ProblemService