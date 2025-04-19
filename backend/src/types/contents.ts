import z from 'zod';
import { contentSchema, ContentUnionSchema, networkSchema, noteSchema, streamSchema, todoSchema, todosSchema } from "../valid/contents";
import { Document, Types, Model } from "mongoose";


export enum Priority{
    High = 'high',
    Medium = 'medium',
    Low = 'low'
}


export type TContent = z.infer<typeof contentSchema>; 
export type TNote = z.infer<typeof noteSchema>;
export type TStream = z.infer<typeof streamSchema>;
export type TTodo = z.infer<typeof todoSchema>;
export type TTodos = z.infer<typeof todosSchema>;
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


export type AllModels = NoteModel | StreamModel | TodosModel | NetworkModel | ContentModel ;