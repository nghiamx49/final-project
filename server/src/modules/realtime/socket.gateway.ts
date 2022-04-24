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
