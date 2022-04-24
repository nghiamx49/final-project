import { IUser } from "../store/interface/user.interface";

export interface INotification {
  _id: string;
  creator: IUser;
  description: string;
  link: string;
  readBy: IUser[];
  createdAt: Date;
  receivers: IUser[];
}

export interface IPushNotification {
  description: string;
  link: string;
  receiverId?: string;
}
