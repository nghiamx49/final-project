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


  async login(request, response: Response) {
    response.status(HttpStatus.OK).json({
      user: new UserResponseDto(request.user),
      isAuthenticated: true,
      token: this.jwtService.sign({ user: request.user }),
    });
  }

  async register(registerDto: RegisterDto, response: Response): Promise<Response> {
    try {
      const { username } = registerDto;
      const findUser: User = await this.userRepository.findOne({ username });
      if (findUser) {
        response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Account already existed!',
        });
        return;
      } else {
        await this.userRepository.create({
          ...registerDto,
          password: this.passwordEncoder.encodePassword(registerDto.password),
        });
        response
          .status(HttpStatus.CREATED)
          .json({ message: 'account created' });
        return;
      }
    } catch (error) {
      response.status(500).json({message: error?.message})
    }
  }
}
