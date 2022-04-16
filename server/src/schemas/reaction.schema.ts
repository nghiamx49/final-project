import { Document, Schema, Types } from "mongoose";
import { UserDocument } from "./user.schema";


export interface ReactionDocument extends Document {
    _id: Types.ObjectId;
    reactionType: String;
    reactionBy: UserDocument;
}

export const Reaction = new Schema({
    reactionType: String,
    reactionBy: {type: Types.ObjectId, ref: 'Users'}
})