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
    CallModule
  ],
})
export class CombineModude {}
