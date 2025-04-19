import { tagSchema } from "../valid/tags";
import z from "zod";
import { Document, Types, Model } from "mongoose";



interface IBaseContent extends Document {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


export type TTag = z.infer<typeof tagSchema>;

export interface ITag extends IBaseContent, TTag{}
