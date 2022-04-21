import { IUser } from "../store/interface/user.interface";

export interface IReaction {
    _id: string;
    reactionType: string;
    reactionBy: IUser;
}