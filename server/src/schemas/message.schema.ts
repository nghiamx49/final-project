import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  _id: { type: Types.ObjectId };
  @Prop({ type: String })
  content: string;
  @Prop({ type: User })
  sender: User;
  @Prop({ required: false, type: Date, default: new Date() })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);