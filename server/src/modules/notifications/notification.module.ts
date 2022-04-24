import { Module } from '@nestjs/common';
import { FriendListRepository } from 'src/repository/friendList.repository';
import { NotificationRepository } from 'src/repository/notification.repository';
import { UserRepository } from 'src/repository/user.repository';
import { DatabaseModule } from '../persistance/db.module';
import {
  friendListProvider,
  notificationProvider,
  userProvider,
} from '../persistance/db.providers';
import { RealtimeGateWay } from '../realtime/socket.gateway';
import { RealtimeModule } from '../realtime/socket.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  providers: [
    NotificationService,
    notificationProvider,
    NotificationRepository,
    userProvider,
    UserRepository,
    friendListProvider,
    FriendListRepository,
    RealtimeGateWay,
  ],
  controllers: [NotificationController],
  imports: [DatabaseModule, RealtimeModule],
})
export class NotifcationModule {}
