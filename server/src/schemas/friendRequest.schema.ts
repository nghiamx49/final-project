import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FriendRequest_Status } from 'src/interface/status.interface';
import { User } from './user.schema';

export type FriendRequestDocument = FriendRequest & Document; 

@Schema()
export class FriendRequest {
    _id: {type: Types.ObjectId}
    @Prop({type: Types.ObjectId, ref: 'Users'})
    sender: User
    @Prop({type: Types.ObjectId, ref: "Users"})
    receiver: User
    @Prop({type: String, enum: [FriendRequest_Status.NOT_SENT, FriendRequest_Status.PENDING, FriendRequest_Status.ACCEPTED, FriendRequest_Status.DECLIEND], default: FriendRequest_Status.PENDING})
    status: string
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);