import { Module } from '@nestjs/common';
import { CommentRepository } from '../../repository/comment.repository';
import { FeedRepository } from '../../repository/feed.repository';
import { FriendListRepository } from '../../repository/friendList.repository';
import { ReactionRepository } from '../../repository/reaction.repository';
import { UserRepository } from '../../repository/user.repository';

import { DatabaseModule } from '../persistance/db.module';
import {
  commentProvider,
  feedProviders,
  friendListProvider,
  reactionProvider,
  userProvider,
} from '../persistance/db.providers';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  controllers: [FeedController],
  providers: [
    FeedService,
    feedProviders,
    FeedRepository,
    userProvider,
    reactionProvider,
    commentProvider,
    friendListProvider,
    UserRepository,
    ReactionRepository,
    CommentRepository,
    FriendListRepository,
  ],
  imports: [DatabaseModule],
})
export class FeedModule {}
