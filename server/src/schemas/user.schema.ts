import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true, type: String })
  username: string;
  @Prop({ require: true, type: String })
  password: string;
  @Prop({ require: true, type: String })
  fullName: string;
  @Prop({ require: true, type: Date })
  dateOfBirth: Date;
  @Prop({ type: Number })
  age: number;
  @Prop({ type: String })
  address?: string;
  @Prop({ require: false, type: Date, default: new Date() })
  createdAt: Date;
  @Prop({ require: false, type: Date, default: new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);