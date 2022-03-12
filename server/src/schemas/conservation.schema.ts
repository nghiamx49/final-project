import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from './message.schema';
import { User } from './user.schema';

export type ConservationDocument = Conservation & Document;

@Schema()
export class Conservation {
  _id: { type: Types.ObjectId };
  @Prop([{ type: User }])
  users: User[];
  @Prop([{ type: Message }])
  messages?: Message[];
  @Prop({ required: false, type: Date, default: new Date() })
  lastUpdated: Date;
}

export const ConservationSchema = SchemaFactory.createForClass(Conservation);