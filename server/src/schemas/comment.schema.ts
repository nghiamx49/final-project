import { Document, Schema, Types } from 'mongoose';
import { CpuInfo } from 'os';
import { UserDocument } from './user.schema';

export interface CommentDocument extends Document {
    _id: Types.ObjectId
    content: string
    author: UserDocument
    replies?: CommentDocument[];
    createdAt: Date;
}

export const Comment = new Schema(
  {
    content: String,
    author: { type: Types.ObjectId, ref: 'Users' },
    replies: [
      {
        author: { type: Types.ObjectId, ref: 'Users' },
        content: String,
        createdAt: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamps: true },
);