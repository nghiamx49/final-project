import { UserDocument } from '../../schemas/user.schema';
import { UserBaseDto } from '../auth/dto/user.dto';

export class UserResponseDto extends UserBaseDto {
  constructor(userModel: UserDocument, friendList?: UserResponseDto[]) {
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
    this.allFriends = friendList;
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
  allFriends?: UserResponseDto[];
  isOnline: boolean;
  socketId: string;
}

export class UpdateAccountDto {
  fullname?: string;
  dateOfBirth?: Date;
  address?: string;
  createdAt?: Date;
  avatar?: string;
  cover?: string;
  username?: string;
}
