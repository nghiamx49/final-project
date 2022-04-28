import { Module } from '@nestjs/common';
import { FriendListRepository } from '../../repository/friendList.repository';
import { UserRepository } from '../../repository/user.repository';

import { DatabaseModule } from '../persistance/db.module';
import { friendListProvider, userProvider } from '../persistance/db.providers';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  providers: [
    userProvider,
    UserRepository,
    ProfileService,
    friendListProvider,
    FriendListRepository,
  ],
  controllers: [ProfileController],
  imports: [DatabaseModule],
})
export class ProfileModule {}
