import { Injectable } from '@nestjs/common';
import { FriendListRepository } from '../../repository/friendList.repository';
import { UserRepository } from '../../repository/user.repository';
import { FriendListDocument } from '../../schemas/friendList.schema';
import { UserDocument } from '../../schemas/user.schema';
import { UpdateAccountDto, UserResponseDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly friendListRepository: FriendListRepository,
  ) {}

  async getAccountProfile(profileFilter: string): Promise<UserResponseDto> {
    try {
      const userInDb: UserDocument = await this.userRepository.findOne({
        username: profileFilter,
      });
      if (userInDb) {
        const userFriendList: FriendListDocument =
          await this.friendListRepository.findOne({ user: userInDb });
        await userFriendList.populate('allFriends');
        const friendListDTo: UserResponseDto[] = userFriendList.allFriends.map(
          (user) => new UserResponseDto(user),
        );
        return new UserResponseDto(userInDb, friendListDTo);
      } else {
        const userInDb = await this.userRepository.findOne({
          _id: profileFilter,
        });
        const userFriendList: FriendListDocument =
          await this.friendListRepository.findOne({ user: userInDb });
        await userFriendList.populate('allFriends');
        const friendListDTo: UserResponseDto[] = userFriendList.allFriends.map(
          (user) => new UserResponseDto(user),
        );
        return new UserResponseDto(userInDb, friendListDTo);
      }
    } catch (error) {
      throw new Error('Cannot Found');
    }
  }

  async updateProfile(
    userfilter: string,
    updateProfileDto: UpdateAccountDto,
  ): Promise<void> {
    const userInDb: UserDocument = await this.userRepository.findOne({
      username: userfilter,
    });
    if (userInDb) {
      await this.userRepository.findOneAndUpdate(
        { username: userfilter },
        { ...updateProfileDto },
      );
    } else {
      await this.userRepository.findOneAndUpdate(
        { _id: userfilter },
        { ...updateProfileDto },
      );
    }
  }
}
