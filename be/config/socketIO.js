import { Server } from 'socket.io';
import * as dotenv from 'dotenv'
dotenv.config();
const { CLIENT_URL } = process.env;
export default function socketConnect(server) {
    const io = new Server(server, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        socket.on("addNotification",(data) => {
            io.emit("newNotification");
        })
        // socket.emit("newNotification",{message: "admin"})
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}
