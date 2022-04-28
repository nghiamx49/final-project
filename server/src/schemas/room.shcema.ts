import { Document, Schema, Types } from 'mongoose';
import { UserDocument } from './user.schema';

export interface RoomDocument extends Document {
  _id: Types.ObjectId;
  roomId: string;
  createdAt: Date;
}

export const Room = new Schema(
  {
    roomId: String,
  },
  { timestamps: true },
);
