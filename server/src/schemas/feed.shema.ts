import { Document, Schema, Types } from 'mongoose';
import { CommentDocument } from './comment.schema';
import { ReactionDocument } from './reaction.schema';
import { User } from './user.schema';

export class FeedDocument extends Document {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  comments?: CommentDocument[];
  userReactions?: ReactionDocument[];
  content: string;
  contentImage?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const Feed = new Schema({
  author: {type: Types.ObjectId, ref: 'Usrers'},
  comments: [{type: Types.ObjectId, ref: 'Comments'}],
  userReactions: [{type: Types.ObjectId, ref: 'Reactions'}],
  content: String,
  contentImage: [{type: String}],
}, {timestamps: true});