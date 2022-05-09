import { Injectable } from '@nestjs/common';
import { count } from 'console';
import { CommentRepository } from '../../repository/comment.repository';
import { FeedRepository } from '../../repository/feed.repository';
import { UserRepository } from '../../repository/user.repository';
import { UserResponseDto } from '../auth/dto/user.dto';
import { TopUserDto } from './TopUserDto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private feedRepository: FeedRepository,
    private commentRepository: CommentRepository,
  ) {}

  async getAllUsers(name: string = ''): Promise<UserResponseDto[]> {
    const allUsersInDb = await this.userRepository.find({
      fullname: new RegExp(name, 'i'),
    });
    return allUsersInDb.map((user) => new UserResponseDto(user));
  }

  async changeUserActiveStatus(userId: string, status: boolean): Promise<void> {
    await this.userRepository.findOneAndUpdate(
      { _id: userId },
      { isActive: status },
    );
  }

  async getTopActiveUsers(): Promise<TopUserDto[]> {
    const allPostGroupByUser = await this.feedRepository.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: '$author',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      { $limit: 3 },
    ]);
    const topUser = await Promise.all(
      allPostGroupByUser.map(async (item) => {
        const user = await this.userRepository.findOne({
          _id: item._id,
        });
        const comments = await this.commentRepository.countDocuments({
          author: item._id,
        });
        const posts = await this.feedRepository.countDocuments({
          author: item._id,
        });
        return new TopUserDto(user, posts, comments)
      }),
    );
    return topUser;
  }
}
