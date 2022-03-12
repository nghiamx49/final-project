import { Injectable, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto, RegisterDto } from './dto/user.dto';
import { User } from 'src/schemas/user.schema';
import { PasswordEncoder } from 'src/utils/crypto.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly passwordEncoder: PasswordEncoder
  ) {}


  async login(user: User) {
    return {
      user: new UserResponseDto(user),
      isAuthenticated: true,
      token: this.jwtService.sign({ user: user }),
    };
  }

  async register(registerDto: RegisterDto): Promise<Response> {
    try {
      const { username } = registerDto;
      const findUser: User = await this.userRepository.findOne({ username });
      if (findUser) {
        throw new Error('Account already existed')
      } else {
        await this.userRepository.create({
          ...registerDto,
          password: this.passwordEncoder.encodePassword(registerDto.password),
        });
        return;
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
