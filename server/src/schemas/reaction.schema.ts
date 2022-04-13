import { Document, Schema, Types } from "mongoose";


export interface ReactionDocument extends Document {
    _id: Types.ObjectId,
    reactionType: String,
    reactionBy: Types.ObjectId
}

export const Reaction = new Schema({
    reactionType: String,
    reactionBy: {type: Types.ObjectId, ref: 'Users'}
})