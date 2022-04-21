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
  isVerify: boolean;
}

export const User = new Schema({
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
  isVerify: {type: Boolean, default: false}
}, {timestamps: true});
