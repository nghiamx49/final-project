import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { CallModule } from './calls/call.module';
import { ConservationModule } from './conservation/conservation.module';
import { FeedModule } from './feeds/feed.module';
import { FriendModule } from './friends/friend.module';
import { NotifcationModule } from './notifications/notification.module';
import { ProfileModule } from './profile/profile.module';
import { RealtimeModule } from './realtime/socket.module';
import { StatisticalModule } from './statistical/statistical.module';
import { UserModule } from './user/user.module';
import { ValidationModule } from './validation/validation.module';
@Module({
  imports: [
    AuthModule,
    FriendModule,
    ValidationModule,
    ProfileModule,
    FeedModule,
    RealtimeModule,
    ConservationModule,
    NotifcationModule,
    CallModule,
    UserModule,
    StatisticalModule
  ],
})
export class CombineModude {}
