import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.route.js";
import authRoutes from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})
const app = express();
app.use(cookieParser());
app.use(express.json());
app.listen(3000,()=>{
    console.log("Server is running on port 3000!!!!!");
})


app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{
    const status = err.status||500;
    const msg = err.message || 'internel Server Error';
    return res.status(status).json({
        success: false,
        status,
        msg,
    })
})