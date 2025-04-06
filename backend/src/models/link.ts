import mongoose, { model, Schema } from 'mongoose';
import { ILink } from '../types/types';


const TagSchema = new Schema<ILink>({
    hash: { type:String },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true }
},
{timestamps: true});


export const Tag = model<ILink>('Tag', TagSchema);