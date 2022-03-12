import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type FeedDocument = Feed & Document;

@Schema()
export class Feed {
    _id: Types.ObjectId
    @Prop({type: Date, default: new Date()})
    createdAt: Date
    @Prop({type: User})
    author: User
    @Prop([{type: Comment}])
    comments?: Comment[]
    @Prop([{type: User}])
    userReactions?: User[]
    @Prop({type: String})
    content: String
    @Prop([{type: String}])
    contentImage?: String[]
}

export const FeedSchema = SchemaFactory.createForClass(Feed);