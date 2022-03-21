import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
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
    @Prop([raw({
        author: {type: Types.ObjectId, ref: 'User'},
        content: String,
        createdAt: {type: Date, default: new Date()}
    })])
    reply: Record<string, any>;
}

export const CommentSchema = SchemaFactory.createForClass(Comment)