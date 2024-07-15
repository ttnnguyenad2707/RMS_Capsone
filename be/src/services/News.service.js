import HousesModel from "../models/Houses.model.js";
import NewsModel from "../models/News.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import getPaginationData from "../utils/getPaginationData.js";
import prisma from "../utils/prismaClient.js";
const NewsService = {
    addOne: async (req) => {
        try {
            const { houseId, title, content, images } = req.body;
            
            // Check if the house exists
            const house = await prisma.house.findUnique({
                where: { id: parseInt(houseId) },
            });
            if (!house) {
                throw new Error("House not found");
            }
    
            // Get the current user ID (assuming you have a way to get this)
            const authorId = getCurrentUser(req);
    
            // Create a new news item
            const news = await prisma.news.create({
                data: {
                    title,
                    content,
                    author: { connect: { id: parseInt(authorId) } }, // Connect news to author
                    house: { connect: { id: parseInt(houseId) } }, // Connect news to house
                    imagesnews: {
                        createMany: {
                            data: images.map(url => ({ url })),
                        },
                    },
                },
                include: { imagesnews: true }, // Ensure images are included in the returned news object
            });
    
            return news;
        } catch (error) {
            throw error;
        }
    },
    getAll: async (req) => {
        try {
            const { houseId } = req.params;
            const { page, limit, title, content } = req.query;
    
            const filter = { houseId: parseInt(houseId), deleted: false };
    
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
    
            const data = await getPaginationData(prisma.news, page, limit, filter, ['author']);
    
            return data;
        } catch (error) {
            throw error;
        }
    },
    getOne: async (req) => {
        try {
            const { newsId } = req.params;
    
            // Fetch the news item with related data
            const news = await prisma.news.findUnique({
                where: {
                    id: parseInt(newsId),
                },
                include: {
                    author: true,  // Assuming `author` is a relation in your news model
                    comment: true, // Assuming `comments` is a relation in your news model
                    // likedBy: true,  // Assuming `likedBy` is a relation in your news model
                },
            });
    
            if (!news) {
                throw new Error(`News with ID ${newsId} not found`);
            }
    
            // Calculate the number of likes
            // const likedCount = news.likedBy.length;
    
            return news
        } catch (error) {
            throw error;
        }
    },
    updateOne: async (req) => {
        try {
            const { newsId } = req.params;
            await prisma.news.update({
                where: {
                    id: parseInt(newsId),
                },
                data: {
                    ...req.body,
                },
            });
    
            const newData = await prisma.news.findUnique({
                where: {
                    id: parseInt(newsId),
                },
            });
    
            return newData;
        } catch (error) {
            throw error;
        }
    },
    deleteOne: async (req) => {
        try {
            const { newsId } = req.params;
            
            await prisma.news.update({
                where: {
                    id: parseInt(newsId),
                },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });
    
            const newData = await prisma.news.findUnique({
                where: {
                    id: parseInt(newsId),
                },
            });
    
            return newData;
        } catch (error) {
            throw error;
        }
    },
};

export default NewsService;
