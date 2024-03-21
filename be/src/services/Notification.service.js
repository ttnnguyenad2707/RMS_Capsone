import Notification from "../models/Notification.model.js";
import getCurrentUser from "../utils/getCurrentUser.js";
import mongoose from "mongoose";

const NotificationService = {
    getAll: async (req) => {
        try {
            const currentUserId = getCurrentUser(req);
            const notifications = await Notification.aggregate([
                {
                    $match: {
                        "recipients.user": new mongoose.Types.ObjectId(currentUserId)
                    }
                },
                {
                    $unwind: "$recipients"
                },
                {
                    $match: {
                        "recipients.user": new mongoose.Types.ObjectId(currentUserId)
                    }
                },
                {
                    $project: {
                        sender: 1,
                        title: 1,
                        content: 1,
                        type: 1,
                        isRead: "$recipients.isRead",
                        createdAt: 1,
                        updatedAt: 1,
                    }
                },
                {
                    $sort: {
                        createdAt: -1 
                    }
                },
                
            ]);

            return notifications;
        } catch (error) {
            throw error;
        }
    },
    updateOne: async (req) => {
        try {
            const { notificationId } = req.params;
            const {isRead} = req.body
            const currentUserId = getCurrentUser(req);
    
            const notification = await Notification.findOneAndUpdate(
                {
                    _id: notificationId,
                    "recipients.user": new mongoose.Types.ObjectId(currentUserId),
                },
                {
                    $set: {
                        "recipients.$.isRead": isRead,
                    },
                },
                {
                    new: true, 
                }
            );
    
            if (!notification) {
                return { message: "Notification not found or you do not have permission to update it." };
            }
    
            return notification;
        } catch (error) {
            throw error;
        }
    }
};

export default NotificationService;
