import { Document, Schema, Types } from 'mongoose';
import { ReactionDocument } from './reaction.schema';
import { StoryDocument } from './story.schema';
import { UserDocument } from './user.schema';

export interface MessageDocument extends Document {
  _id: Types.ObjectId;
  content: string;
  sender: UserDocument;
  reactions: ReactionDocument[];
  createdAt: Date;
  updatedAt: Date;
  isStoryReply: boolean;
  story?: StoryDocument;
  contentMedia?: Map<string, string>[];
}

export const Message = new Schema(
  {
    content: String,
    sender: { type: Types.ObjectId, ref: 'Users' },
    reactions: [{ type: Types.ObjectId, ref: 'Reactions' }],
    isStoryReply: { type: Boolean, default: false },
    story: { type: Types.ObjectId, ref: 'Stories' },
    contentMedia: [
      {
        mediaUrl: String,
        mediaType: { type: String, enum: ['video', 'image'] },
      },
    ],
  },
  { timestamps: true },
);
