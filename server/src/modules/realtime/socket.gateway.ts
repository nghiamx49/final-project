import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UserRepository } from 'src/repository/user.repository';
import { UserResponseDto } from '../auth/dto/user.dto';
import { FriendListRepository } from 'src/repository/friendList.repository';
import { CallAnswer, CallFriend, CallResponse } from './socket.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateWay
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly friendListRepository: FriendListRepository,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('online')
  async handleUserOnline(client: Socket, userId: string): Promise<void> {
    const userInDdb = await this.userRepository.findOneAndUpdate(
      { _id: userId },
      { socketId: client.id, isOnline: true },
    );
     this.server
       .to(userInDdb.socketId)
       .emit('me', new UserResponseDto(userInDdb));
    this.logger.log(`User Online: ${userInDdb.fullname}`);
    const friendList = await this.friendListRepository.findOne(
      { user: userInDdb._id },
      null,
      { populate: [{ path: 'allFriends' }] },
    );
    const friendListSocketId = friendList.allFriends
      .filter((user) => user.isOnline)
      .map((user) => user?.socketId);
    if (friendListSocketId.length > 0) {
      const payload = new UserResponseDto(userInDdb);
      this.server.to(friendListSocketId).emit('friend-online', payload);
    }
  }

  @SubscribeMessage('conservation-read')
  triggerUpdateConservations(client: Socket) {
    this.server.to(client.id).emit('conservation-updated');
  }

  afterInit(server: Server) {
    this.logger.log('Socket Init');
  }

  @SubscribeMessage('call-request')
  async callUser(client: Socket, data: CallFriend) {
    const sender = await this.userRepository.findOne({ _id: data.senderId });
    const receiver = await this.userRepository.findOne({
      _id: data.receiverId,
    });
    const responseDto: CallResponse = {
      from: new UserResponseDto(sender),
      signal: data.signal,
    };
    this.server.to(receiver.socketId).emit('call-request', responseDto);
  }

  @SubscribeMessage('answer-call')
  async anserCall(client: Socket, data: CallAnswer) {
    data.to
    const sender = await this.userRepository.findOne({ _id: data.userId });
    this.server.to(data.to).emit('call-accepted', {signal: data.signal, receiver: sender});
  }

  @SubscribeMessage('call-declined')
  declientCall(client: Socket, data: CallResponse) {
    this.server.to(data.from.socketId).emit('friend-decline');
  }

  @SubscribeMessage('leave-call')
  async callEnd(client: Socket, receiverId: string) {
    const user = await this.userRepository.findOne({ _id: receiverId });
    this.server.to(user.socketId).emit('call-end');
  }

  async handleDisconnect(client: Socket): Promise<void> {
    this.logger.log(`socket off: ${client.id}`);
    const userInDdb = await this.userRepository.findOneAndUpdate(
      { socketId: client.id },
      { isOnline: false },
    );
    if (userInDdb) {
      this.logger.log(`User Offline: ${userInDdb.fullname}`);
      const friendList = await this.friendListRepository.findOne(
        { user: userInDdb._id },
        null,
        { populate: [{ path: 'allFriends' }] },
      );
      const friendListSocketId = friendList.allFriends
        .filter((user) => user.isOnline)
        .map((user) => user?.socketId);
      if (friendListSocketId.length > 0) {
        const payload = new UserResponseDto(userInDdb);
        console.log(friendListSocketId);
        this.server.to(friendListSocketId).emit('friend-offline', payload);
      }
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`socket on: ${client.id}`);
  }

  getServer(): Server {
    return this.server;
  }
}
