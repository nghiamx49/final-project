import { ConsoleLogger, Injectable } from '@nestjs/common';
import { FriendRequest_Status } from 'src/interface/status.interface';
import { FriendRequestRepository } from 'src/repository/friendRequest.repository';
import { UserRepository } from 'src/repository/user.repository';
import { FriendRequestDocument } from 'src/schemas/friendRequest.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserResponseDto } from '../auth/dto/user.dto';
import { StatusChecking } from './dto/friendStatusChecking.dto';

@Injectable()
export class FriendService {
  constructor(
    private readonly friendRepository: FriendRequestRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async sendNewFriendRequest(
    senderId: string,
    receiverId: string,
  ): Promise<void> {
    const checkExisting: FriendRequestDocument = await this.friendRepository.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (
      checkExisting &&
      checkExisting.status === FriendRequest_Status.PENDING
    ) {
      throw new Error('You already send one');
    } else {
      const sender: UserDocument = await this.userRepository.findOne({ _id: senderId });
      const receiver: UserDocument = await this.userRepository.findOne({
        _id: receiverId,
      });
      const makeNewFriendRequest: FriendRequestDocument =
        await this.friendRepository.create({
          sender,
          receiver,
        });
    }
  }

  async checkCurrentFriendStatus(
    userId: string,
    targetUserId: string,
  ): Promise<StatusChecking> {
    let sender = await this.userRepository.findOne({ _id: userId });
    let receiver = await this.userRepository.findOne({ _id: targetUserId });
    let checkIfExisted: FriendRequestDocument = await this.friendRepository.findOne({
      sender: sender,
      receiver: receiver,
    });
    if(!checkIfExisted) {
      checkIfExisted = await this.friendRepository.findOne({
        sender: receiver,
        receiver: sender,
      });
    }
    const checkFriend: UserDocument = await this.userRepository.findOne({
      _id: userId,
    });
    checkFriend.populate('allFriends')
    const targetUser: UserDocument = await this.userRepository.findOne({
      _id: targetUserId,
    });
    if (
      checkFriend.allFriends.filter(
        (user) => user._id.toString() === targetUser._id.toString(),
      ).length > 0 &&
      targetUser.allFriends.filter(
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
      return new StatusChecking(checkIfExisted.status, checkIfExisted.sender._id.toString(), checkIfExisted.receiver._id.toString(), checkIfExisted._id.toString());
    } else {
      return new StatusChecking(FriendRequest_Status.NOT_SENT, "", "", "");
    }
  }

  async getAllFriendRequests(userId: string): Promise<UserResponseDto[]> {
    const sender = await this.userRepository.findOne({ _id: userId });
    const allSentFriendRequests: FriendRequestDocument[] =
      await this.friendRepository.find({
        sender: sender,
        status: FriendRequest_Status.PENDING,
      });
    const listWaitingForResponse: UserResponseDto[] = allSentFriendRequests.map(
      (item: FriendRequestDocument): UserResponseDto =>
        new UserResponseDto(item.receiver),
    );
    return listWaitingForResponse;
  }

  async getAllReceivedFriendRequests(
    userId: string,
  ): Promise<UserResponseDto[]> {
    const receiver = await this.userRepository.findOne({ _id: userId });
    const allSentFriendRequests: FriendRequestDocument[] =
      await this.friendRepository.find({
        receiver: receiver,
        status: FriendRequest_Status.PENDING,
      });
    const listWaitingForAccept: UserResponseDto[] = allSentFriendRequests.map(
      (item: FriendRequestDocument): UserResponseDto =>
        new UserResponseDto(item.sender),
    );
    return listWaitingForAccept;
  }

  async getAllUserFriends(userId: string): Promise<UserResponseDto[]> {
    try {
      const userInDB: UserDocument = await await this.userRepository.findOne({
        _id: userId,
      });
      const allFriendsOfUser: Promise<UserResponseDto>[] =
        userInDB.allFriends.map(
          async (user) =>
            new UserResponseDto(
              await this.userRepository.findOne({ _id: user }),
            ),
        );
      const response: UserResponseDto[] = await Promise.all(allFriendsOfUser);
      return response;
    } catch (error) {
      throw new Error(error)
    }
  }

  async handleFriendRequest(userId: string, requestId:string ,status: string): Promise<void> {
    const user = await this.userRepository.findOne({_id: userId});
    const checkRoleInRequest = await this.friendRepository.findOne({_id: requestId});
    if(checkRoleInRequest.sender._id.toString() === userId) {
      throw new Error("You cannot resolve this request");
    }
    else {
      if(status === FriendRequest_Status.ACCEPTED) {
        const sender: UserDocument = await this.userRepository.findOne({_id: checkRoleInRequest?.sender?._id});
        let listReceiverFriend: UserDocument[] = user.allFriends;
        listReceiverFriend.push(sender);
        let listSenderFriend: UserDocument[] = sender.allFriends;
        listSenderFriend.push(user);
        await this.userRepository.findOneAndUpdate(
          { _id: sender._id },
          { allFriends: listSenderFriend},
        );
        await this.userRepository.findOneAndUpdate(
          { _id: userId },
          { allFriends: listReceiverFriend },
        );
        await this.friendRepository.findOneAndDelete({_id: requestId});
      }
      else if (status === FriendRequest_Status.DECLIEND) {
        await this.friendRepository.findOneAndUpdate({_id: requestId}, {status});
      }
      else {
        throw new Error("Status not valid")
      }
    }
  }

  async handleUnfriend(userId: string, friendId: string): Promise<void> {
    const user: UserDocument = await this.userRepository.findOne({_id: userId});
    const friend: UserDocument = await this.userRepository.findOne({_id: friendId});
    let userListFriend: UserDocument[] = user.allFriends;
    let friendListFriend: UserDocument[] = friend.allFriends;
    userListFriend = userListFriend.filter((item) => item._id.toString() !== friendId);
    friendListFriend = friendListFriend.filter(item => item._id.toString() !== userId);
    await this.userRepository.findOneAndUpdate({_id: userId}, {allFriends: userListFriend});
    await this.userRepository.findOneAndUpdate({_id: friendId}, {allFriends: friendListFriend});
  }
}
