import mongoose, { model, Schema } from 'mongoose';
import { ITag } from '../types/types';


const TagSchema = new Schema<ITag>({
    tag: { type:String, }
},
{timestamps: true});


export const Tag = model<ITag>('Tag', TagSchema);