import { connect } from "mongoose";
import CommentsModel from "../models/Comments.model.js";
import NewsModel from "../models/News.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import getPaginationData from "../utils/getPaginationData.js";
import prisma from "../utils/prismaClient.js";

const CommentService = {
    addOne: async (req) => {
        try {
            const { newsId } = req.params;
            const creatorId = getCurrentUser(req);
    
            // Check if news exists
            const news = await prisma.news.findUnique({
                where: {
                    id: parseInt(newsId),
                },
            });
    
            if (!news) {
                throw new Error("News not found");
            }
    
            // Create comment
            const comment = await prisma.comment.create({
                data: {
                    ...req.body,
                    account: {connect: {id: parseInt(creatorId)}},
                    news: {connect: {id: parseInt(newsId)}},
                },
            });
    
            // Update news to associate the comment
            await prisma.news.update({
                where: {
                    id: parseInt(newsId),
                },
                data: {
                    comment: {
                        connect: {
                            id: comment.id,
                        },
                    },
                },
            });
    
            return comment;
        } catch (error) {
            throw error;
        }
    },
    getAll: async (req) => {
        try {
            const { newsId } = req.params;
            const { page, limit } = req.query;
    
            // Check if news exists
            const news = await prisma.news.findUnique({
                where: {
                    id: parseInt(newsId),
                },
            });
    
            if (!news) {
                throw new Error("News not found");
            }
    
            // Query to fetch comments with pagination
            const comments = await prisma.comment.findMany({
                where: {
                    newsId: parseInt(newsId),
                    deleted: false,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                
                include: {
                    account: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            email: true,
                        },
                    }, // Assuming "account" is the related field to fetch creator details
                },
            });
    
            return comments;
        } catch (error) {
            throw error;
        }
    }
}

export default CommentService
