import { Document, Schema, Types } from 'mongoose';
import { CommentDocument } from './comment.schema';
import { ReactionDocument } from './reaction.schema';
import { UserDocument } from './user.schema';

export class FeedDocument extends Document {
  _id: Types.ObjectId;
  author: UserDocument;
  comments: CommentDocument[];
  reactions: ReactionDocument[];
  content: string;
  contentMedia?: Map<string, string>[];
  createdAt: Date;
  updatedAt: Date;
}

export const Feed = new Schema(
  {
    author: { type: Types.ObjectId, ref: 'Users' },
    comments: [{ type: Types.ObjectId, ref: 'Comments' }],
    reactions: [{ type: Types.ObjectId, ref: 'Reactions' }],
    content: String,
    contentMedia: [
      {
        mediaUrl: String,
        mediaType: { type: String, enum: ['video', 'image'] },
      },
    ],
  },
  { timestamps: true },
);
