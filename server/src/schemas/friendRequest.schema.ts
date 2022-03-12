import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FriendRequest_Status } from 'src/interface/status.interface';
import { User } from './user.schema';

export type FriendRequestDocument = FriendRequest & Document; 

@Schema()
export class FriendRequest {
    _id: {type: Types.ObjectId}
    @Prop({type: User})
    sender: User
    @Prop({type: User})
    receiver: User
    @Prop({type: String, enum: FriendRequest_Status, default: FriendRequest_Status.NOT_SENT})
    status: string
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);