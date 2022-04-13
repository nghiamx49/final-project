import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestRepository } from 'src/repository/friendRequest.repository';
import { UserRepository } from 'src/repository/user.repository';
import { DatabaseModule } from '../persistance/db.module';
import { friendRequestProvider, userProvider } from '../persistance/db.providers';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [DatabaseModule],
  providers: [FriendService, UserRepository, FriendRequestRepository, userProvider, friendRequestProvider],
  controllers: [FriendController]
})
export class FriendModule {}
