import { Document, Schema, Types } from "mongoose";


export interface StoryDocument extends Document {
    _id: Types.ObjectId,
    storyType: string,
    style?: Record<string, any>;
    content?: string;
    backgoundColor?: string;
    backgoundImage?: string;
    timePlay: string;
    reactions: Types.ObjectId[];
}

export const Story = new Schema({
    storyType: String,
    style: {
        yOffset: String,
        xOffset: String,
        textColor: String,
        textBgColor: String
    },
    content: String,
    backgoundColor: String,
    backgoundImage: String,
    timePlay: String,
    reactions: [{type: Types.ObjectId, ref: 'Reactions'}]
})