import { IMedia } from "../interface/feedItem.interface";
import { IReaction } from "../interface/reaction.interface";
import { IUser } from "../store/interface/user.interface";

export interface ISendMessage {
  senderId: string;
  content: string;
  contentMedia?: IMedia[];
  receiverId?: string;
  conservationId?: string;
}


export interface IMessage {
  _id: string;
  content: string;
  sender: IUser;
  reactions: IReaction[];
  createdAt: Date;
  updatedAt: Date;
  isStoryReply: boolean;
  //story?: StoryDocument;
  contentMedia?: IMedia[];
}