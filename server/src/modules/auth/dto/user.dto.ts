import {User} from 'src/schemas/user.schema'
import {Types} from 'mongoose';
abstract class UserBaseDto {
    username: string;
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
    this.username = userModel.username;
    this.fullname = userModel.fullname;
    this.dateOfBirth = userModel.dateOfBirth;
    this.age = userModel.age;
    this.address = userModel.address;
    this.createdAt = userModel.createdAt;
    this._id = userModel._id;
    this.role = userModel.role;
  }
  _id: { type: Types.ObjectId };
  role: string;
  fullname: string;
  dateOfBirth: Date;
  age: number;
  address?: string;
  createdAt?: Date;
}