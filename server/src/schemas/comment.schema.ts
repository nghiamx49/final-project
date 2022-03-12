import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type CommentDocument = Comment & Document

@Schema()
export class Comment {
    _id: Types.ObjectId
    @Prop({type: String})
    content: string
    @Prop({type: User})
    author: User
    @Prop({type: Date, default: new Date()})
    createdAt: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)