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
    private readonly feedRepository: FeedRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async getAllUsers(
    name: string = '',
    page: number = 1,
    sort: string = 'asc',
  ): Promise<{ data: UserResponseDto[] , totalPage: number}> {
    const LIMIT = process.env.PAGE_LIMIT;
    console.log(LIMIT);
    const totalPage = Math.ceil(
      (await this.userRepository.countDocuments({fullname: new RegExp(name, 'i'), role: 'User'})) / parseInt(LIMIT),
    );
    const allUsersInDb = await this.userRepository.find(
      {
        fullname: new RegExp(name, 'i'),
        role: 'User',
      },
      null,
      {
        sort: { createdAt: sort },
        skip: (page - 1) * parseInt(LIMIT),
        limit: parseInt(LIMIT),
      },
    );
    return { data: allUsersInDb.map((user) => new UserResponseDto(user)) , totalPage};
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
        return new TopUserDto(user, posts, comments);
      }),
    );
    return topUser;
  }
}
