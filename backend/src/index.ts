import dotenv from "dotenv";
dotenv.config();

import express from "express";
import rootRouter from './routes/index';
import cors from "cors";
import mongoose from "mongoose";

const url : string = process.env.MONGO_URI!;

mongoose.connect(url)
.then(()=>{console.log("Database Connected")})
.catch((err)=>{console.error(err)});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(PORT);