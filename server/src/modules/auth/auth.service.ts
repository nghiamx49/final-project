import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto, RegisterDto } from './dto/user.dto';
import { UserDocument } from 'src/schemas/user.schema';
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

  async changePassword(email:string , newPassowrd: string): Promise<void> {
    try {
      await this.userRepository.findOneAndUpdate(
        { email },
        { password: this.passwordEncoder.encodePassword(newPassowrd) },
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
