import { Module } from "@nestjs/common";
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from "./auth/auth.module";
@Module({
    imports: [AuthModule]
})
export class CombineModude {}
