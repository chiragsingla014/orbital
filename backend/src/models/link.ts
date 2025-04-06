import mongoose, { model, Schema } from 'mongoose';
import { ILink } from '../types/types';


const LinkSchema = new Schema<ILink>({
    hash: { type:String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: Schema.Types.ObjectId, ref: 'Content', required: true }
},
{timestamps: true});


export const Link = model<ILink>('Tag', LinkSchema);