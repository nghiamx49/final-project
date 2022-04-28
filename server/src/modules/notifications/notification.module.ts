import { Module } from '@nestjs/common';
import { FriendListRepository } from '../../repository/friendList.repository';
import { NotificationRepository } from '../../repository/notification.repository';
import { UserRepository } from '../../repository/user.repository';
import { DatabaseModule } from '../persistance/db.module';
import { notificationProvider, userProvider, friendListProvider } from '../persistance/db.providers';
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
  exports: [NotificationService],
})
export class NotifcationModule {}
