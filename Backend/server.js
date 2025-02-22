<<<<<<< HEAD
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from 'cors';
import {v2 as cloudinary} from 'cloudinary';

dotenv.config();
connectDB(); 
const app=express();
const PORT=process.env.Port || 5000;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

=======
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();

connectDB();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const PORT = process.env.PORT || 5000;

const app=express()
>>>>>>> origin/main
// Middlewares
//app.use(cors());
app.use(express.json({ limit: "20mb" })); // To parse JSON data in req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in req.body
app.use(cookieParser());

<<<<<<< HEAD

=======
>>>>>>> origin/main
// Routes
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

<<<<<<< HEAD
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
=======

// http://localhost:5000 => backend,frontend



app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
>>>>>>> origin/main
