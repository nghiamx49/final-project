import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto, UserResponseDto } from './dto/user.dto';
import { UserDocument } from 'src/schemas/user.schema';
import { PasswordEncoder } from 'src/utils/crypto.util';
import { FriendListRepository } from 'src/repository/friendList.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly friendListRepository: FriendListRepository
  ) {}

  async login(user: UserDocument) {
    return {
      user: new UserResponseDto(user),
      isAuthenticated: true,
      token: this.jwtService.sign({ user: user }),
    };
  }

  async changePassword(email:string , newPassword: string): Promise<void> {
    try {
      await this.userRepository.findOneAndUpdate(
        { email: email },
        { password: this.passwordEncoder.encodePassword(newPassword) },
      );
      return;
    } catch (error) {
      throw new BadRequestException('Password failed to change')
    }
  }

  async register(registerDto: RegisterDto): Promise<void> {
    try {
      const { email } = registerDto;
      const findUser: UserDocument = await this.userRepository.findOne({ email });
      if (findUser) {
        throw new Error('Account already existed');
      } else {
        const age = new Date().getFullYear() - new Date(registerDto.dateOfBirth).getFullYear();
        const account: UserDocument = await this.userRepository.create({
          ...registerDto,
          age,
          password: this.passwordEncoder.encodePassword(registerDto.password),
        });
        await this.friendListRepository.create({
          user: account
        })
        return;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
