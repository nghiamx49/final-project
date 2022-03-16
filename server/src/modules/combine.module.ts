import { Module } from "@nestjs/common";
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from "./auth/auth.module";
import { FriendModule } from "./friends/friend.module";
@Module({
    imports: [AuthModule, FriendModule]
})
export class CombineModude {}
