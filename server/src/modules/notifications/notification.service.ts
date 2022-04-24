import { Injectable } from '@nestjs/common';
import { FriendListRepository } from 'src/repository/friendList.repository';
import { NotificationRepository } from 'src/repository/notification.repository';
import { UserRepository } from 'src/repository/user.repository';
import { RealtimeGateWay } from '../realtime/socket.gateway';
import { NotificationDto, PushNotificationDto } from './notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository,
    private readonly friendListRepository: FriendListRepository,
    private readonly realtimeGateway: RealtimeGateWay,
  ) {}

  async getAllUserNotification(userId: string): Promise<NotificationDto[]> {
    const userNotifications = await this.notificationRepository.find(
      { receivers: userId },
      null,
      {
        populate: [
          { path: 'creator' },
          { path: 'readBy' },
          { path: 'receivers' },
        ],
        sort: { createdAt: 1 },
      },
    );
    return userNotifications.map(
      (notification) => new NotificationDto(notification),
    );
  }

  async pushNotification(
    newNoti: PushNotificationDto,
    userId: string,
  ): Promise<void> {
    const userFriendList = await this.friendListRepository.findOne(
      { user: userId },
      null,
      { populate: { path: 'allFriends' } },
    );
    const newNotification = await this.notificationRepository.create({
      ...newNoti,
      creator: userId,
      receivers: userFriendList.allFriends,
    });
    await newNotification.populate([
      { path: 'creator' },
      { path: 'receivers' },
      { path: 'readBy' },
    ]);
    const onlineUserSocketList = userFriendList.allFriends
      .filter((user) => user.isOnline)
      .map((user) => user.socketId);
    if (onlineUserSocketList.length > 0) {
      this.realtimeGateway
        .getServer()
        .to(onlineUserSocketList)
        .emit('new-notification', new NotificationDto(newNotification));
    }
  }

  async markNotifcationAsRead(
    userId: string,
    notificationId: string,
  ): Promise<NotificationDto[]> {
    const user = await this.userRepository.findOne({ _id: userId });
    const notification = await this.notificationRepository.findOne({
      _id: notificationId,
    });
    await this.notificationRepository.findOneAndUpdate(
      { _id: notificationId },
      { readBy: [...notification.readBy, user] },
    );
    return await this.getAllUserNotification(userId);
  }

  async friendRequestNotification(
    newNoti: PushNotificationDto,
    userId: string,
  ): Promise<void> {
    const receiver = await this.userRepository.findOne({
      _id: newNoti.receiverId,
    });
    const newNotification = await this.notificationRepository.create({
      ...newNoti,
      creator: userId,
      receivers: [receiver],
    });

    await newNotification.populate([
      { path: 'creator' },
      { path: 'receivers' },
      { path: 'readBy' },
    ]);
    if (receiver.isOnline) {
      this.realtimeGateway
        .getServer()
        .to(receiver.socketId)
        .emit('new-notification', new NotificationDto(newNotification));
    }
  }
}
