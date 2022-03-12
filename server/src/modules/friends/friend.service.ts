import { Injectable } from '@nestjs/common';
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
    const checkExisting: FriendRequest = await this.friendRepository.findOne({sender: senderId, receiver: receiverId});
    if(checkExisting && checkExisting.status === FriendRequest_Status.NOT_SENT) {
        await this.friendRepository.findOneAndUpdate({sender: senderId, receiver: receiverId}, {status: FriendRequest_Status.PENDING});
        return;
    }
    const sender: User = await this.userRepository.findOne({ _id: senderId });
    const receiver: User = await this.userRepository.findOne({
      _id: receiverId,
    });
    const makeNewFriendRequest = await this.friendRepository.create({
      sender,
      receiver,
    });
    const senderRequest: FriendRequest[] = sender.sentFriendRequests;
    senderRequest.push(makeNewFriendRequest);
    const receiverRequest: FriendRequest[] = receiver.receivedFriendRequest;
    receiverRequest.push(makeNewFriendRequest);
    await this.userRepository.findOneAndUpdate(
      { _id: senderId },
      {
        sentFriendRequests: senderRequest,
        receivedFriendRequest: receiverRequest,
      },
    );
  }

  async checkCurrentFriendStatus(
    userId: string,
    targetUserId: string,
  ): Promise<string> {
    const checkIfExisted: FriendRequest = await this.friendRepository.findOne({
      sender: userId,
      receiver: targetUserId,
    });
    if (checkIfExisted) {
      return checkIfExisted.status;
    } else {
      return FriendRequest_Status.NOT_SENT;
    }
  }

  async handleChangedTheFriendRequestStatus(requestId: string, status: string): Promise<void> {
    await this.friendRepository.findOneAndUpdate({_id: requestId}, {status: status});
  }

  async getAllSentFriendRequests(userId: string): Promise<FriendRequest[]> {
    const userInDb: User = await (
      await this.userRepository.findOne({ id: userId })
    ).populate({ path: 'FriendRequest', populate: { path: 'User' } });
    const allSentFriendRequests: FriendRequest[] = userInDb.sentFriendRequests;
    return allSentFriendRequests;
  }

  async getAllReceivedFriendRequests(userId: string): Promise<FriendRequest[]> {
    const userInDb: User = await (
      await this.userRepository.findOne({ id: userId })
    ).populate({ path: 'FriendRequest', populate: { path: 'User' } });
    const allReceivedFriendRequests: FriendRequest[] =
      userInDb.receivedFriendRequest;
    return allReceivedFriendRequests;
  }

  async getAllUserFriends(userId: string): Promise<UserResponseDto[]> {
    const userInDB: User = await (
      await this.userRepository.findOne({ _id: userId })
    ).populate('User');
    const allFriendsOfUser: UserResponseDto[] = userInDB.allFriends.map(
      (user) => new UserResponseDto(user),
    );
    return allFriendsOfUser;
  }
}
