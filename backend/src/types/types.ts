import { Document, Types, Model } from "mongoose";
import z from "zod";
import { contentSchema, tagSchema, userSchema, noteSchema, todoSchema, todosSchema, streamSchema, linkSchema, networkSchema, ContentUnionSchema} from "../valid/valid";


export enum Priority{
    High = 'high',
    Medium = 'medium',
    Low = 'low'
}


export type TContent = z.infer<typeof contentSchema>; 
export type TTag = z.infer<typeof tagSchema>;
export type TUser = z.infer<typeof userSchema>;
export type TNote = z.infer<typeof noteSchema>;
export type TStream = z.infer<typeof streamSchema>;
export type TTodo = z.infer<typeof todoSchema>;
export type TTodos = z.infer<typeof todosSchema>;
export type TLink = z.infer<typeof linkSchema>;
export type TNetwork = z.infer<typeof networkSchema>; 

export type TAllContents = z.infer<typeof ContentUnionSchema>;


interface IBaseContent extends Document {
    _id: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IContent extends IBaseContent, Omit<TContent, 'userid' | 'tags'>{
    userid: Types.ObjectId;
    tags: Types.ObjectId[];
}

export interface ITag extends IBaseContent, TTag{}

export interface IUser extends IBaseContent, TUser{}

export interface INote extends IBaseContent, Omit<TNote, 'userid' | 'tags'>{
    userid: Types.ObjectId;
    tags: Types.ObjectId[];
}


export interface IStream extends IBaseContent, Omit<TStream, 'userid' | 'tags'>{
    userid: Types.ObjectId;
    tags: Types.ObjectId[];
}

export interface ITodo extends IBaseContent, TTodo{}

export interface ITodos extends IBaseContent, Omit<TTodos, 'userid' | 'tags'>{
    userid: Types.ObjectId;
    tags: Types.ObjectId[];
}

export interface ILink extends IBaseContent, Omit<TLink, 'userid' | 'content'>{
    userid: Types.ObjectId;
    content: Types.ObjectId

}
export interface INetwork extends IBaseContent, Omit<TNetwork, 'userid' | 'tags' | 'nodes'>{
    userid: Types.ObjectId;
    tags: Types.ObjectId[];
    nodes: Types.ObjectId[];
}

export type ContentModel = Model<IContent>;
export type NoteModel = Model<INote>;
export type StreamModel = Model<IStream>;
export type TodosModel = Model<ITodos>;
export type NetworkModel = Model<INetwork>;



export interface JWTPayload{
    userid: string;
}