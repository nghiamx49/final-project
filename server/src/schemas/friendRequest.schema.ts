import { Document, Schema, Types } from 'mongoose';
import { FriendRequest_Status } from 'src/interface/status.interface';
import { User, UserDocument } from './user.schema';


export interface FriendRequestDocument extends Document {
  _id: Types.ObjectId;
  sender: UserDocument;
  receiver: UserDocument;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export const FriendRequest = new Schema({
    sender: {type: Types.ObjectId, ref: 'Users'},
    receiver: {type: Types.ObjectId, ref: "Users"},
    status: {
    type: String,
    enum: [
      FriendRequest_Status.NOT_SENT,
      FriendRequest_Status.PENDING,
      FriendRequest_Status.ACCEPTED,
      FriendRequest_Status.DECLIEND,
    ],
    default: FriendRequest_Status.PENDING,
  },
}, {timestamps: true})