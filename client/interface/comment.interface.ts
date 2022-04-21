import { IUser } from "../store/interface/user.interface";

export interface IComment {
    _id: string;
    author: IUser;
    content: string;
    createdAt: Date;
    replies: IComment[];
}