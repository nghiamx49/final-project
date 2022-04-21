import { IUser } from "../store/interface/user.interface";
import { IComment } from "./comment.interface";
import { IReaction } from "./reaction.interface";

export interface IMedia {
    mediaUrl: string;
    mediaType: string;
}

export interface IFeed {
    _id: string;
    content: string;
    contentMedia: IMedia[];
    author: IUser;
    comments: IComment[];
    reactions: IReaction[];
    createdAt: Date;
    updatedAt: Date;
}