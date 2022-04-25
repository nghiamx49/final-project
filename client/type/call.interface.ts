import { IUser } from "../store/interface/user.interface";
import Peer from 'simple-peer'

export interface ICallRequest {
  senderId: string;
  receiverId: string;
}

export interface ICallResponse {
  from: IUser;
  signal: any;
}