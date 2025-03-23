import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
const app = express();

// Configure CORS for Express
app.use(cors({
    origin: "http://localhost:3000", // Client's origin
    methods: ["GET", "POST"]
}));

const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Client's origin
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {}; // userId: socketId

io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Handle blue tick on seen message
    socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {
        try {
            await Message.updateMany({ conversationId: conversationId, seen: false }, { $set: { seen: true } });
            await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
            io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
        } catch (error) {
            console.log(error);
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Function to get recipient socket ID
export const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
};

// Export the necessary modules
export { io, server, app };