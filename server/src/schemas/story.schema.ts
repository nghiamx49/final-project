import { Document, Schema, Types } from 'mongoose';
import { ReactionDocument } from './reaction.schema';
import { UserDocument } from './user.schema';

export interface StoryDocument extends Document {
  _id: Types.ObjectId;
  storyType: string;
  style?: Record<string, any>;
  content?: string;
  backgoundColor?: string;
  backgoundImage?: string;
  timePlay: string;
  reactions: ReactionDocument[];
  author: UserDocument;
}

export const Story = new Schema({
  storyType: String,
  style: {
    yOffset: String,
    xOffset: String,
    textColor: String,
    textBgColor: String,
  },
  content: String,
  backgoundColor: String,
  backgoundImage: String,
  timePlay: String,
  reactions: [{ type: Types.ObjectId, ref: 'Reactions' }],
  author: { type: Types.ObjectId, ref: 'Users' },
});
