import z from "zod";
import { linkSchema } from "../valid/link";
import { Document, Types, Model } from "mongoose";


export type TLink = z.infer<typeof linkSchema>;

interface IBaseContent extends Document {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILink extends IBaseContent, Omit<TLink, 'userid' | 'content'>{
    userid: Types.ObjectId;
    content: Types.ObjectId

}