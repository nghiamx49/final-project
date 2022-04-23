import {User, UserDocument} from 'src/schemas/user.schema'
import {Types} from 'mongoose';
import { StatusChecking } from 'src/modules/friends/dto/friendStatusChecking.dto';
export abstract class UserBaseDto {
    email: string;
}

export class LoginDto extends UserBaseDto {
  password: string;
}

export class RegisterDto extends LoginDto {
  fullname: string;
  dateOfBirth: string;
  address?: string;
  role?: string;
}

export class UserResponseDto extends UserBaseDto {
  constructor(userModel: UserDocument, requestId?: string, friendStatus?: StatusChecking) {
    super();
    this.email = userModel.email;
    this.fullname = userModel.fullname;
    this.dateOfBirth = userModel.dateOfBirth;
    this.age = userModel.age;
    this.address = userModel.address;
    this.createdAt = userModel.createdAt;
    this._id = userModel._id.toString();
    this.role = userModel.role;
    this.avatar = userModel.avatar;
    this.cover = userModel.cover;
    this.username = userModel.username;
    this.friendStatus = friendStatus;
    this.requestId = requestId;
     this.isOnline = userModel.isOnline;
     this.socketId = userModel.socketId;
  }
  _id: string;
  role: string;
  fullname: string;
  dateOfBirth: Date;
  age: number;
  address?: string;
  createdAt?: Date;
  avatar?: string;
  cover?: string;
  username?: string;
  friendStatus?: StatusChecking;
  requestId?: string;
  isOnline: boolean;
  socketId: string;
}