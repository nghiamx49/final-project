import { Document, Types, Schema } from 'mongoose';

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  username?: string;
  email: string;
  password: string;
  fullname: string;
  dateOfBirth: Date;
  age: number;
  address?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  cover: string;
  isActive: boolean;
  isOnline: boolean;
  socketId: string;
}

export const User = new Schema(
  {
    username: String,
    email: String,
    password: String,
    fullname: String,
    dateOfBirth: Date,
    age: Number,
    address: String,
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    avatar: String,
    cover: String,
    isActive: { type: Boolean, default: true },
    isOnline: { type: Boolean, default: false },
    socketId: String,
  },
  { timestamps: true },
);
