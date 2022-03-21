import {User} from 'src/schemas/user.schema'
import {Types} from 'mongoose';
abstract class UserBaseDto {
    email: string;
}

export class LoginDto extends UserBaseDto {
  password: string;
}

export class RegisterDto extends LoginDto {
  fullname: string;
  dateOfBirth: string;
  age: number;
  address?: string;
  role?: string;
}

export class UserResponseDto extends UserBaseDto {
  constructor(userModel: User) {
    super();
    this.email = userModel.email;
    this.fullname = userModel.fullname;
    this.dateOfBirth = userModel.dateOfBirth;
    this.age = userModel.age;
    this.address = userModel.address;
    this.createdAt = userModel.createdAt;
    this._id = userModel._id;
    this.role = userModel.role;
    this.avatarPhoto = userModel.avatarPhoto;
    this.coverPhoto = userModel.coverPhoto;
    this.username = userModel.username;
  }
  _id: { type: Types.ObjectId };
  role: string;
  fullname: string;
  dateOfBirth: Date;
  age: number;
  address?: string;
  createdAt?: Date;
  avatarPhoto?: string;
  coverPhoto?: string;
  username?: string;
}