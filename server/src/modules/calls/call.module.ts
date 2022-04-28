import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { EnvironmentConfigModule } from '../../config/config.module';
import { EnvironmentConfigService } from '../../config/environment-config.service';
import * as uuid4 from 'uuid4';
import { CallService } from './call.service';
import { CallController } from './call.controller';
import { RoomRepository } from '../../repository/room.repository';
import { roomProvider } from '../persistance/db.providers';
import { DatabaseModule } from '../persistance/db.module';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (configuration: EnvironmentConfigService) => {
        return <JwtModuleOptions>{
          secret: configuration.getCallSecret(),
          signOptions: {
            expiresIn: '24h',
            jwtid: uuid4(),
            algorithm: 'HS256',
          },
        };
      },
      inject: [EnvironmentConfigService],
    }),
    DatabaseModule,
  ],
  providers: [CallService, RoomRepository, roomProvider],
  controllers: [CallController],
})
export class CallModule {}
