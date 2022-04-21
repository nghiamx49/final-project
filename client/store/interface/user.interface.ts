import { CheckingStatus } from "../../type/CheckingStatus.interface";

export interface IUser {
  username?: string;
  fullname: string;
  dateOfBirth?: Date;
  email: string;
  age: number;
  address?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  avatar?: string;
  cover?: string;
  allFriends: Array<IUser> | [];
  friendStatus: CheckingStatus;
  _id: string;
  requestId?: string;
}