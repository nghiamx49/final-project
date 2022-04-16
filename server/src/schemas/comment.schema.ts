import { Document, Schema, Types } from 'mongoose';
import { UserDocument } from './user.schema';

export interface CommentDocument extends Document {
    _id: Types.ObjectId
    content: string
    author: UserDocument
    reply?: Record<string, any>[];
}

export const Comment = new Schema(
  {
    content: String,
    author: { type: Types.ObjectId, ref: 'Users' },
    reply: [
      {
        author: { type: Types.ObjectId, ref: 'Users' },
        content: String,
        createdAt: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamps: true },
);