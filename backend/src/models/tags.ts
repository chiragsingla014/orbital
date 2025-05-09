import mongoose, { model, Schema } from 'mongoose';
import { ITag } from '../types/tags';


const TagSchema = new Schema<ITag>({
    tag: { type:String, required: true}
},
{timestamps: true});


export const Tag = model<ITag>('Tag', TagSchema);