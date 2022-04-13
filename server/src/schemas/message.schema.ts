import { Document, Schema, Types } from 'mongoose';


export interface MessageDocument extends Document {
  _id: Types.ObjectId;
  content: string;
  sender: Types.ObjectId;
  reactions: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isStoryReply: boolean;
  story: Types.ObjectId
}

export const Message = new Schema({
  content: String,
  sender: {type: Types.ObjectId, ref: 'Users'},
  reactions: [{type: Types.ObjectId, ref: 'Reactions'}],
  isStoryReply: {type: Boolean, default: false},
  story: {type: Types.ObjectId, ref: 'Stories'},
}, {timestamps: true})