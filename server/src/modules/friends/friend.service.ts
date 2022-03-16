import { ConsoleLogger, Injectable } from '@nestjs/common';
import { FriendRequest_Status } from 'src/interface/status.interface';
import { FriendRequestRepository } from 'src/repository/friendRequest.repository';
import { UserRepository } from 'src/repository/user.repository';
import { FriendRequest } from 'src/schemas/friendRequest.schema';
import { User } from 'src/schemas/user.schema';
import { UserResponseDto } from '../auth/dto/user.dto';

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
    const checkExisting: FriendRequest = await this.friendRepository.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (
      checkExisting &&
      checkExisting.status === FriendRequest_Status.PENDING
    ) {
      throw new Error('You already send one');
    } else {
      const sender: User = await this.userRepository.findOne({ _id: senderId });
      const receiver: User = await this.userRepository.findOne({
        _id: receiverId,
      });
      const makeNewFriendRequest: FriendRequest =
        await this.friendRepository.create({
          sender,
          receiver,
        });
      console.log(makeNewFriendRequest);
    }
  }

  async checkCurrentFriendStatus(
    userId: string,
    targetUserId: string,
  ): Promise<string> {
    const sender = await this.userRepository.findOne({ _id: userId });
    const receiver = await this.userRepository.findOne({ _id: targetUserId });
    const checkIfExisted: FriendRequest = await this.friendRepository.findOne({
      sender: sender,
      receiver: receiver,
    });
    const checkFriend: User = await this.userRepository.findOne({
      _id: userId,
    });
    const targetUser: User = await this.userRepository.findOne({
      _id: targetUserId,
    });
    if (
      checkFriend.allFriends.includes(targetUserId) &&
      targetUser.allFriends.includes(userId)
    ) {
      return FriendRequest_Status.ACCEPTED;
    }
    if (checkIfExisted) {
      return checkIfExisted.status;
    } else {
      return FriendRequest_Status.NOT_SENT;
    }
  }

  async getAllFriendRequests(userId: string): Promise<UserResponseDto[]> {
    const sender = await this.userRepository.findOne({ _id: userId });
    const allSentFriendRequests: FriendRequest[] =
      await this.friendRepository.find({
        sender: sender,
        status: FriendRequest_Status.PENDING,
      });
    const listWaitingForResponse: UserResponseDto[] = allSentFriendRequests.map(
      (item: FriendRequest): UserResponseDto =>
        new UserResponseDto(item.receiver),
    );
    return listWaitingForResponse;
  }

  async getAllReceivedFriendRequests(
    userId: string,
  ): Promise<UserResponseDto[]> {
    const receiver = await this.userRepository.findOne({ _id: userId });
    const allSentFriendRequests: FriendRequest[] =
      await this.friendRepository.find({
        receiver: receiver,
        status: FriendRequest_Status.PENDING,
      });
    const listWaitingForAccept: UserResponseDto[] = allSentFriendRequests.map(
      (item: FriendRequest): UserResponseDto =>
        new UserResponseDto(item.sender),
    );
    return listWaitingForAccept;
  }

  async getAllUserFriends(userId: string): Promise<UserResponseDto[]> {
    try {
      const userInDB: User = await await this.userRepository.findOne({
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
        const sender: User = await this.userRepository.findOne({_id: checkRoleInRequest?.sender?._id});
        let listReceiverFriend: string[] = user.allFriends;
        listReceiverFriend.push(sender._id.toString());
        let listSenderFriend: string[] = sender.allFriends;
        listSenderFriend.push(userId);
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
    const user: User = await this.userRepository.findOne({_id: userId});
    const friend: User = await this.userRepository.findOne({_id: friendId});
    let userListFriend: string[] = user.allFriends;
    let friendListFriend: string[] = friend.allFriends;
    userListFriend = userListFriend.filter((item) => item !== friendId);
    friendListFriend = friendListFriend.filter(item => item !== userId);
    await this.userRepository.findOneAndUpdate({_id: userId}, {allFriends: userListFriend});
    await this.userRepository.findOneAndUpdate({_id: friendId}, {allFriends: friendListFriend});
  }
}
