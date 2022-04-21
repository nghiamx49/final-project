import { Document, Schema, Types } from "mongoose";
import { UserDocument } from "./user.schema";

export interface ActiveConservationDocument extends Document {
    _id: Types.ObjectId;
    friend: UserDocument;
    isOnline: boolean;
}

export const ActiveConservation = new Schema({
    friend: {type: Types.ObjectId, ref: 'Users'},
    isOnline: {type: Boolean, default: false},
}, {timestamps: true})