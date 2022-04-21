import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentConfigModule } from 'src/config/config.module';
import { EnvironmentConfigService } from 'src/config/environment-config.service';
import { LocalStrategy, JwtStrategy } from 'src/middleware/authenticate.middleware';
import { RolesGuard } from 'src/middleware/authorize.middleware';
import { FriendListRepository } from 'src/repository/friendList.repository';
import { UserRepository } from 'src/repository/user.repository';
import { PasswordEncoder } from 'src/utils/crypto.util';
import { DatabaseModule } from '../persistance/db.module';
import { friendListProvider, userProvider } from '../persistance/db.providers';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PasswordEncoder,
    UserRepository,
    RolesGuard,
    EnvironmentConfigService,
    FriendListRepository,
    userProvider,
    friendListProvider,
  ],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (configuration: EnvironmentConfigService) => {
        return <JwtModuleOptions>{
          secret: configuration.getSecretKey(),
          signOptions: {
            expiresIn: '24h',
          },
        };
      },
      inject: [EnvironmentConfigService],
    }),
    DatabaseModule
  ],
  exports: [AuthService]
})
export class AuthModule {}
