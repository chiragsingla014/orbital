import { Document, Types } from "mongoose";
import z from "zod";
import { contentSchema, tagSchema, userSchema, noteSchema, todoSchema, todosSchema, streamSchema, linkSchema } from "../valid/valid";


export enum Priority{
    High = 'high',
    Medium = 'medium',
    Low = 'low'
}


type TContent = z.infer<typeof contentSchema>; 
type TTag = z.infer<typeof tagSchema>;
type TUser = z.infer<typeof userSchema>;
type TNote = z.infer<typeof noteSchema>;
type TStream = z.infer<typeof streamSchema>;
type TTodo = z.infer<typeof todoSchema>;
type TTodos = z.infer<typeof todosSchema>
type TLink = z.infer<typeof linkSchema>


export interface IContent extends Document, Omit<TContent, 'userid' | 'tags'>{
    userid: Types.ObjectId;
    tags: Types.ObjectId[];
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITag extends Document, TTag{
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser extends Document, TUser{
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface INote extends Document, TNote{
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IStream extends Document, TStream{
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITodo extends Document, TTodo{
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITodos extends Document, TTodos{
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILink extends Document, Omit<TLink, 'userid'>{
    _id: Types.ObjectId;
    userid: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}