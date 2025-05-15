import { Router, Request, Response } from "express";
import { TUser, } from "../types/user";
import { userSchema } from "../valid/user";
import { User } from "../models/user";
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getEnv } from "../utils/utils";
const JWT_SECRET : string = getEnv("JWT_SECRET");

const userRouter = Router();

userRouter.post('/signup', async (req : Request, res : Response) => {

    try{
        const result = userSchema.safeParse(req.body);
        if(!result.success){
            res.status(411).json({"error":"incorrect data"});
            return;
        }
        const body = result.data;
        body.password = await hash(body.password, 10);
        const existingUser = await User.findOne({ username: body.username });
        if (existingUser) {
            res.status(409).json({ error: "Username already taken" });
            return;
        }
        const user = await User.create(body);
        const userid = user._id;
    
        const token = sign({userid}, JWT_SECRET);
        res.status(200).json({message: "User created Successfully", token});
        return;
    }catch(err : any ){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});

userRouter.post('/signin', async (req : Request, res : Response) => {
    try{
        const result = userSchema.safeParse(req.body);
        if(!result.success){
            res.status(400).json({"error":"incorrect data"});
            return;
        }
        const body = result.data;
        const user = await User.findOne({ username: body.username });
        if(!user){
            res.status(401).json({"error": "username or password incorrect"});
            return;
        }
        const isMatch = await compare(body.password, user.password);
        if(!isMatch){
            res.status(401).json({"error": "username or password incorrect"});
            return;
        }
        const userid = user._id;
        const token = sign({userid}, JWT_SECRET);
        res.status(200).json({message: "User logged in", token});
        return;
    }catch(err: any){
        console.log(err);
        res.status(500).json({error: err.message});
        return;
    }
});


export default userRouter;