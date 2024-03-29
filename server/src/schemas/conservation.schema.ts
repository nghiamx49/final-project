import { Document, Types, Schema } from 'mongoose';
import { MessageDocument } from './message.schema';
import { UserDocument } from './user.schema';

export interface ConservationDocument extends Document {
  _id: Types.ObjectId;
  members: UserDocument[];
  messages: MessageDocument[];
  createdAt?: Date;
  updatedAt?: Date;
  readBy: UserDocument[];
}

export const Conservation = new Schema(
  {
    members: [{ type: Types.ObjectId, ref: 'Users' }],
    messages: [{ type: Types.ObjectId, ref: 'Messages' }],
    readBy: [{ type: Types.ObjectId, ref: 'Users' }],
  },
  { timestamps: true },
);
