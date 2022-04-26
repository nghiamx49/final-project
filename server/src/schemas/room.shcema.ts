import { Document, Schema, Types } from "mongoose";
import { UserDocument } from "./user.schema";


export interface RoomDocument extends Document {
  _id: Types.ObjectId;
  members: UserDocument[];
  createdAt: Date;
}

export const Room = new Schema({
    members: {type:  Types.ObjectId, ref: 'Users'},
    signal: String
}, {timestamps: true})