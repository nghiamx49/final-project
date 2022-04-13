import { Document, Types, Schema } from 'mongoose';

export interface ConservationDocument extends Document {
  _id: Types.ObjectId;
  users: Types.ObjectId[];
  messages?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
};


export const Conservation = new Schema({
  users: [{type: Types.ObjectId, ref: 'Users'}],
  messages: [{type: Types.ObjectId, ref: 'Messages'}],
}, {timestamps: true});