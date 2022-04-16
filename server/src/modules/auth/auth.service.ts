import { Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto, RegisterDto } from './dto/user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { PasswordEncoder } from 'src/utils/crypto.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly passwordEncoder: PasswordEncoder,
  ) {}

  async getAccountProfile(profileFilter: string): Promise<UserResponseDto> {
   try {
      const userInDb: UserDocument = await this.userRepository.findOne({
        username: profileFilter,
      });
      if (userInDb) {
        return new UserResponseDto(userInDb);
      } else {
        const userInDb = await this.userRepository.findOne({
          _id: profileFilter,
        });
        return new UserResponseDto(userInDb);
      }
   } catch (error) {
     throw new Error('Cannot Found')
   }
  }

  async login(user: UserDocument) {
    return {
      user: new UserResponseDto(user),
      isAuthenticated: true,
      token: this.jwtService.sign({ user: user }),
    };
  }

  async register(registerDto: RegisterDto): Promise<void> {
    try {
      const { email } = registerDto;
      const findUser: UserDocument = await this.userRepository.findOne({ email });
      if (findUser) {
        throw new Error('Account already existed');
      } else {
        const age = new Date().getTime() - new Date(registerDto.dateOfBirth).getMilliseconds();
        await this.userRepository.create({
          ...registerDto,
          age,
          password: this.passwordEncoder.encodePassword(registerDto.password),
        });
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
