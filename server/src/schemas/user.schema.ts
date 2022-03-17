import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: { type: Types.ObjectId };
  @Prop({ required: false, type: String })
  username?: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ required: true, type: String })
  password: string;
  @Prop({ required: true, type: String })
  fullname: string;
  @Prop({ required: true, type: Date })
  dateOfBirth: Date;
  @Prop({ type: Number })
  age: number;
  @Prop({ type: String })
  address?: string;
  @Prop({
    required: true,
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  })
  role: string;
  @Prop([{ type: String }])
  allFriends: string[];
  @Prop({ required: false, type: Date, default: new Date() })
  createdAt: Date;
  @Prop({ required: false, type: Date, default: new Date() })
  updatedAt: Date;
  @Prop({ type: String })
  avatarPhoto: string;
  @Prop({ type: String })
  coverPhoto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
