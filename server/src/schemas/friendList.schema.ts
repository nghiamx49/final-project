import { Document, Schema, Types } from 'mongoose';
import { UserDocument } from './user.schema';

export interface FriendListDocument extends Document {
  _id: Types.ObjectId;
  user: UserDocument;
  allFriends: UserDocument[];
}

export const FriendList = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'Users' },
    allFriends: [{ type: Types.ObjectId, ref: 'Users' }],
  },
  { timestamps: true },
);
