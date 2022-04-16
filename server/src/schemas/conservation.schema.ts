import { Document, Types, Schema } from 'mongoose';
import { MessageDocument } from './message.schema';
import { UserDocument } from './user.schema';

export interface ConservationDocument extends Document {
  _id: Types.ObjectId;
  users: UserDocument[];
  messages?: MessageDocument[];
  createdAt?: Date;
  updatedAt?: Date;
};


export const Conservation = new Schema({
  users: [{type: Types.ObjectId, ref: 'Users'}],
  messages: [{type: Types.ObjectId, ref: 'Messages'}],
}, {timestamps: true});