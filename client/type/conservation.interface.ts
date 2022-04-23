import { IUser } from "../store/interface/user.interface";
import { IMessage } from "./message.interface";

export interface IConservation {
  _id: string;
  members: IUser[];
  messages: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
  readBy: IUser[];
}