import { IUser } from "./user.interface";

export interface IAuthenciateState {
  user: IUser;
  isAuthenticated: boolean,
  token: string,
}