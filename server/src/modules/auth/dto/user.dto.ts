import {User} from 'src/schemas/user.schema'

abstract class UserBaseDto {
    username: string;
}

export class LoginDto extends UserBaseDto {
  password: string;
}

export class RegisterDto extends LoginDto {
  fullName: string;
  dateOfBirth: string;
  age: number;
  address?: string;
}

export class UserResponseDto extends UserBaseDto {
  constructor(userModel: User) {
    super();
    this.username = userModel.username;
    this.fullName = userModel.fullName;
    this.dateOfBirth = userModel.dateOfBirth;
    this.age = userModel.age;
    this.address = userModel.address;
    this.createdAt = userModel.createdAt;
  }
  fullName: string;
  dateOfBirth: Date;
  age: number;
  address?: string;
  createdAt?: Date;
}