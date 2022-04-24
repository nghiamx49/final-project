import { Document, Schema, Types } from 'mongoose';
import { UserDocument } from './user.schema';

export interface NotificationDocument extends Document {
  _id: Types.ObjectId;
  creator: UserDocument;
  description: string;
  link: string;
  readBy: UserDocument[];
  receivers: UserDocument[];
  createdAt: Date;
}

export const Notification = new Schema(
  {
    creator: { type: Types.ObjectId, ref: 'Users' },
    description: String,
    readBy: [{ type: Types.ObjectId, ref: 'Users' }],
    link: String,
    receivers: [{ type: Types.ObjectId, ref: 'Users' }],
  },
  { timestamps: true },
);
