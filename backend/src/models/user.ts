import mongoose, { model, Schema } from 'mongoose';
import { IUser } from '../types/user';


const UserSchema = new Schema<IUser>({
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 60,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 60
    }
  }, { timestamps: true });

export const User = model<IUser>('User', UserSchema)