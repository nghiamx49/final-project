import { Document, Schema, Types } from 'mongoose';
import { Reactions } from '../interface/reaction.interface';
import { UserDocument } from './user.schema';

export interface ReactionDocument extends Document {
  _id: Types.ObjectId;
  reactionType: string;
  reactionBy: UserDocument;
  postId: string;
}

export const Reaction = new Schema({
  reactionType: { type: String, enum: Object.values(Reactions) },
  reactionBy: { type: Types.ObjectId, ref: 'Users' },
  postId: String,
});
