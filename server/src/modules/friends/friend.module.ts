import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendListRepository } from 'src/repository/friendList.repository';
import { FriendRequestRepository } from 'src/repository/friendRequest.repository';
import { UserRepository } from 'src/repository/user.repository';
import { NotifcationModule } from '../notifications/notification.module';
import { DatabaseModule } from '../persistance/db.module';
import {
  friendListProvider,
  friendRequestProvider,
  notificationProvider,
  userProvider,
} from '../persistance/db.providers';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [DatabaseModule, NotifcationModule],
  providers: [
    FriendService,
    UserRepository,
    FriendRequestRepository,
    userProvider,
    friendRequestProvider,
    FriendListRepository,
    friendListProvider,
  ],
  controllers: [FriendController],
})
export class FriendModule {}
