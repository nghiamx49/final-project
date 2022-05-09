import { Injectable } from '@nestjs/common';
import { FriendRequest_Status } from '../../interface/status.interface';
import { FriendListRepository } from '../../repository/friendList.repository';
import { FriendRequestRepository } from '../../repository/friendRequest.repository';
import { UserRepository } from '../../repository/user.repository';
import { FriendListDocument } from '../../schemas/friendList.schema';
import { FriendRequestDocument } from '../../schemas/friendRequest.schema';
import { UserDocument } from '../../schemas/user.schema';

import { UserResponseDto } from '../auth/dto/user.dto';
import { PushNotificationDto } from '../notifications/notification.dto';
import { NotificationService } from '../notifications/notification.service';
import { StatusChecking } from './dto/friendStatusChecking.dto';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRequestRepository,
    private readonly userRepository: UserRepository,
    private readonly friendListRepository: FriendListRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async sendNewFriendRequest(
    senderId: string,
    receiverId: string,
  ): Promise<void> {
    const checkExisting: FriendRequestDocument =
      await this.friendRepository.findOne({
        sender: senderId,
        receiver: receiverId,
      });
    if (
      checkExisting &&
      checkExisting.status === FriendRequest_Status.PENDING
    ) {
      throw new Error('You already send one');
    } else {
      const sender: UserDocument = await this.userRepository.findOne({
        _id: senderId,
      });
      const receiver: UserDocument = await this.userRepository.findOne({
        _id: receiverId,
      });
      await this.friendRepository.create({
        sender,
        receiver,
      });
      const data: PushNotificationDto = {
        description: 'sent you a friend request',
        link: `/profile/${sender._id}`,
        receiverId: receiverId,
      };
      await this.notificationService.friendRequestNotification(data, senderId);
    }
  }

  async checkCurrentFriendStatus(
    userId: string,
    targetUserId: string,
  ): Promise<StatusChecking> {
    let senderFriendList: FriendListDocument =
      await this.friendListRepository.findOne({ user: userId });
    let receiverFriendList: FriendListDocument =
      await this.friendListRepository.findOne({ user: targetUserId });
    let checkIfExisted: FriendRequestDocument =
      await this.friendRepository.findOne({
        sender: userId,
        receiver: targetUserId,
      });
    if (!checkIfExisted) {
      checkIfExisted = await this.friendRepository.findOne({
        sender: targetUserId,
        receiver: userId,
      });
    }
    const checkFriend: UserDocument = await this.userRepository.findOne({
      _id: userId,
    });
    const targetUser: UserDocument = await this.userRepository.findOne({
      _id: targetUserId,
    });
    if (
      senderFriendList.allFriends.filter(
        (user) => user._id.toString() === targetUser._id.toString(),
      ).length > 0 &&
      receiverFriendList.allFriends.filter(
        (user) => user._id.toString() === checkFriend._id.toString(),
      ).length > 0
    ) {
      return new StatusChecking(
        FriendRequest_Status.ACCEPTED,
        userId,
        targetUserId,
        '',
      );
    }
    if (checkIfExisted) {
      return new StatusChecking(
        checkIfExisted.status,
        checkIfExisted.sender._id.toString(),
        checkIfExisted.receiver._id.toString(),
        checkIfExisted._id.toString(),
      );
    } else {
      return new StatusChecking(FriendRequest_Status.NOT_SENT, '', '', '');
    }
  }

  async getAllFriendRequests(userId: string): Promise<UserResponseDto[]> {
    const sender = await this.userRepository.findOne({ _id: userId });
    const allSentFriendRequests: FriendRequestDocument[] =
      await this.friendRepository.find(
        {
          sender: sender,
          status: FriendRequest_Status.PENDING,
        },
        null,
        { populate: 'sender receiver', sort: { createdAt: -1 } },
      );
    const listWaitingForResponse: Promise<UserResponseDto>[] =
      allSentFriendRequests.map(
        async (item: FriendRequestDocument): Promise<UserResponseDto> => {
          const checkStatus = await this.checkCurrentFriendStatus(
            userId,
            item.receiver._id.toString(),
          );
          return new UserResponseDto(
            item.receiver,
            item._id.toString(),
            checkStatus,
          );
        },
      );
    return Promise.all(listWaitingForResponse);
  }

  async getAllReceivedFriendRequests(
    userId: string,
  ): Promise<UserResponseDto[]> {
    const receiver = await this.userRepository.findOne({ _id: userId });
    const allSentFriendRequests: FriendRequestDocument[] =
      await this.friendRepository.find(
        {
          receiver: receiver,
          status: FriendRequest_Status.PENDING,
        },
        null,
        { populate: 'sender receiver', sort: { createdAt: -1 } },
      );
    const listWaitingForAccept: Promise<UserResponseDto>[] =
      allSentFriendRequests.map(
        async (item: FriendRequestDocument): Promise<UserResponseDto> => {
          const checkStatus = await this.checkCurrentFriendStatus(
            userId,
            item.sender._id.toString(),
          );
          return new UserResponseDto(
            item.sender,
            item._id.toString(),
            checkStatus,
          );
        },
      );
    return Promise.all(listWaitingForAccept);
  }

  async getAllUserFriends(userId: string, name: string = ''): Promise<UserResponseDto[]> {
    try {
      const userFriendList: FriendListDocument =
        await this.friendListRepository.findOne({
          user: userId,
        }, null, {
          populate: {path: 'allFriends'}
        });
      const response = userFriendList.allFriends.filter(user => user.fullname.match(new RegExp(name, 'i'))).sort((user, nextUser) => user.createdAt.getTime() - nextUser.createdAt.getTime()).map(
        async (user: UserDocument): Promise<UserResponseDto> => {
          const friendStatus = await this.checkCurrentFriendStatus(
            userId,
            user._id.toString(),
          );
          return new UserResponseDto(user, null, friendStatus);
        },
      );
      return await Promise.all(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async handleFriendRequest(
    userId: string,
    requestId: string,
    status: string,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ _id: userId });
    const checkRoleInRequest = await this.friendRepository.findOne({
      _id: requestId,
    });
    if (checkRoleInRequest.sender._id.toString() === userId) {
      throw new Error('You cannot resolve this request');
    } else {
      if (status === FriendRequest_Status.ACCEPTED) {
        const sender: UserDocument = await this.userRepository.findOne({
          _id: checkRoleInRequest?.sender?._id,
        });
        let listReceiverFriend: FriendListDocument =
          await this.friendListRepository.findOne({
            user: userId,
          });
        listReceiverFriend.allFriends.push(sender);
        let listSenderFriend: FriendListDocument =
          await this.friendListRepository.findOne({ user: sender._id });
        listSenderFriend.allFriends.push(user);
        await this.friendListRepository.findOneAndUpdate(
          { _id: listSenderFriend._id },
          { allFriends: listSenderFriend.allFriends },
        );
        await this.friendListRepository.findOneAndUpdate(
          { _id: listReceiverFriend._id },
          { allFriends: listReceiverFriend.allFriends },
        );
        await this.friendRepository.findOneAndDelete({ _id: requestId });
        const data: PushNotificationDto = {
          description: 'had accepted your request',
          link: `/profile/${checkRoleInRequest.receiver._id.toString()}`,
          receiverId: checkRoleInRequest.sender._id.toString(),
        };
        await this.notificationService.friendRequestNotification(
          data,
          checkRoleInRequest.receiver._id.toString(),
        );
      } else if (status === FriendRequest_Status.DECLIEND) {
        await this.friendRepository.findOneAndDelete({ _id: requestId });
        const data: PushNotificationDto = {
          description: 'had declined your request',
          link: `/profile/${checkRoleInRequest.receiver._id.toString()}`,
          receiverId: checkRoleInRequest.sender._id.toString(),
        };
        await this.notificationService.friendRequestNotification(
          data,
          checkRoleInRequest.receiver._id.toString(),
        );
      } else {
        throw new Error('Status not valid');
      }
    }
  }

  async handleUnfriend(userId: string, friendId: string): Promise<void> {
    let userListFriend: FriendListDocument =
      await this.friendListRepository.findOne({ user: userId });
    let friendListFriend: FriendListDocument =
      await this.friendListRepository.findOne({ user: friendId });
    let updateUserListFriend: UserDocument[] = userListFriend.allFriends.filter(
      (item) => item._id.toString() !== friendId,
    );
    let updateFriendListFriend: UserDocument[] =
      friendListFriend.allFriends.filter(
        (item) => item._id.toString() !== userId,
      );
    await this.friendListRepository.findOneAndUpdate(
      { _id: userListFriend._id },
      { allFriends: updateUserListFriend },
    );
    await this.friendListRepository.findOneAndUpdate(
      { _id: friendListFriend._id },
      { allFriends: updateFriendListFriend },
    );
  }

  async handleCancelRequest(requestId: string): Promise<void> {
    await this.friendRepository.findOneAndDelete({
      _id: requestId,
    });
  }

  async getRecommendFriends(userId: string): Promise<UserResponseDto[]> {
    const allUserInDb: UserDocument[] = await this.userRepository.find(
      { _id: { $ne: userId } },
      null,
      { sort: { createdAt: -1 } },
    );
    const responseDto = await Promise.all(
      allUserInDb.map(async (user) => {
        const checkFriendStatus: StatusChecking =
          await this.checkCurrentFriendStatus(userId, user._id.toString());
        return new UserResponseDto(user, null, checkFriendStatus);
      }),
    );
    return responseDto.filter(
      (user: UserResponseDto) =>
        user.friendStatus.status === FriendRequest_Status.NOT_SENT,
    );
  }
}
