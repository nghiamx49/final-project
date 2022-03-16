import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestRepository } from 'src/repository/friendRequest.repository';
import { UserRepository } from 'src/repository/user.repository';
import {
  FriendRequest,
  FriendRequestSchema,
} from 'src/schemas/friendRequest.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  providers: [FriendService, UserRepository, FriendRequestRepository],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: FriendRequest.name, schema: FriendRequestSchema },
    ]),
  ],
  exports: [FriendService],
  controllers: [FriendController]
})
export class FriendModule {}
