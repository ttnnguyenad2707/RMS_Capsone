import Notification from "../models/Notification.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import mongoose from "mongoose";
import prisma from "../utils/prismaClient.js";

const NotificationService = {
    getAll: async (req) => {
        try {
            const currentUserId = getCurrentUser(req); // Assuming you have this function to get the current user ID
    
            // Fetch notifications for the current user
            const notifications = await prisma.notification.findMany({
                where: {
                    recipients: {
                        some: {
                            userId: currentUserId
                        }
                    }
                },
                include: {
                    account: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                            username: true,
                            roomId: true,
                        }
                    },
                    recipients: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
    
            // Transform notifications to match the expected structure
            const transformedNotifications = notifications.map(notification => {
                const recipient = notification.recipients.find(r => r.userId === currentUserId);
                return {
                    sender: notification.account,
                    message: notification.message,
                    type: notification.type,
                    link: notification.link,
                    isRead: recipient.isRead,
                    createdAt: notification.createdAt,
                    updatedAt: notification.updatedAt,
                };
            });
    
            return transformedNotifications;
        } catch (error) {
            throw error;
        }
    },
    
    updateOne: async (req) => {
        try {
            const { notificationId } = req.params;
            const { isRead } = req.body;
            const currentUserId = getCurrentUser(req);
    
            // Find the recipient entry that matches the notification ID and current user ID
            const recipient = await prisma.recipients.findFirst({
                where: {
                    notificationId: parseInt(notificationId),
                    userId: currentUserId,
                },
            });
    
            if (!recipient) {
                return { message: "Notification not found or you do not have permission to update it." };
            }
    
            // Update the isRead status of the recipient
            const updatedRecipient = await prisma.recipients.update({
                where: {
                    id: recipient.id,
                },
                data: {
                    isRead: Boolean( isRead ),
                },
            });
    
            // Fetch the updated notification including the updated recipient
            const updatedNotification = await prisma.notification.findUnique({
                where: {
                    id: parseInt(notificationId),
                },
                include: {
                    recipients: true,
                    account: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                            username: true,
                            roomId: true,
                        },
                    },
                },
            });
    
            return updatedNotification;
        } catch (error) {
            throw error;
        }
    }
};

export default NotificationService;
