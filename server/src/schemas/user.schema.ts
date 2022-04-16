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
  allFriends: UserDocument[];
  createdAt: Date;
  updatedAt: Date;
  avatarPhoto: string;
  coverPhoto: string;
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
  allFriends: [{type: Types.ObjectId, ref: 'Users'}],
  avatarPhoto: String,
  coverPhoto: String,
  isVerify: {type: Boolean, default: false}
}, {timestamps: true});
