import mongoose, { model, Schema } from 'mongoose';
import { IUser } from '../types/types';


const UserSchema = new Schema<IUser>({
    username: {type: String ,required: true, trim: true, unique: true, minLength: 3, maxLength: 30, lowercase: true},
    password: {type: String, required: true, minLength: 6},})

export const User = model<IUser>('User', UserSchema)