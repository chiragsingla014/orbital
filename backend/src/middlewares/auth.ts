import { Request, Response, NextFunction } from "express";
import { TUser, } from "../types/user";
import { userSchema } from "../valid/user";
import { User } from "../models/user";
import { verify } from 'jsonwebtoken';
import { getEnv } from "../utils/utils";
import { JWTPayload } from "../types/types";
const JWT_SECRET : string = getEnv("JWT_SECRET");

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void>=>{
    try{
        const auth = req.headers.authorization;
        if(!auth || !auth.startsWith("Bearer")){
            res.status(403).json({"error":"invalid token 1"});
            return;
        }
        const token = auth.split(" ")[1];
        const body = verify(token, JWT_SECRET) as JWTPayload;
        const user = await User.findOne({ _id: body.userid });
        if(!user){
            res.status(411).json({"error": "username doesn't exist"});
            return;
        }
        req.body = { ...req.body, userid: body.userid} as typeof req.body & {userid : string};
        next();
    }catch(err){
        console.error(err);
        res.status(403).json({"error":"invalid token"});
        return;
        
    }

}