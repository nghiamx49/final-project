import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type ActiveConservationDocument = ActiveConservation & Document;

@Schema()
export class ActiveConservation {
    _id: {type: Types.ObjectId}
    @Prop({type: String})
    socketId: string
    @Prop({type: Types.ObjectId})
    userId: Types.ObjectId
    @Prop({type: Types.ObjectId})
    conservationId: Types.ObjectId
}

export const ActiveConservationSchema = SchemaFactory.createForClass(ActiveConservation);