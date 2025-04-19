import { userSchema } from "../valid/user";
import z from "zod";
import { Document, Types, Model } from "mongoose";


interface IBaseContent extends Document {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


export type TUser = z.infer<typeof userSchema>;

export interface IUser extends IBaseContent, TUser{}
