import { Injectable } from "@nestjs/common";
import { FeedRepository } from "../../repository/feed.repository";
import { UserRepository } from "../../repository/user.repository";


@Injectable()
export class StatisticalService {
    constructor(
        private readonly feedRepo: FeedRepository,
        private readonly userRepo: UserRepository,
    ){}

    async applicationUsersAndPostsCount() {
      return {
        users: await this.userRepo.countDocuments({}),
        posts: await this.feedRepo.countDocuments({})
      }
    }

    async postsPerDay() {
        const postsPerDayInDB = await this.feedRepo.aggregate([
          {
            $match: {},
          },
          {
            $group: {
              _id: {
                date: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                },
              },
              posts: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
          {
            $limit: 10,
          },
        ]);
    return postsPerDayInDB;
    }
    

    async feedIn3daysNearby() {
        return await this.feedRepo.aggregate([
          {
            $match: {},
          },
          {
            $group: {
              _id: {
                date: {
                  $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                },
              },
              posts: { $sum: 1 },
            },
          },
          {
            $sort: { _id: -1 },
          },
          {
            $limit: 3,
          },
        ]);
    }
}