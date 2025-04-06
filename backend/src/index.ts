import express from "express";
import rootRouter from './routes/index';
import cors from "cors";
import dotenv from "dotenv";
const PORT = process.env.PORT || 5000;



const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(PORT);



// npm install --save-dev @types/express cors body-parser