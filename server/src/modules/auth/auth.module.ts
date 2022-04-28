import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentConfigModule } from '../../config/config.module';
import { EnvironmentConfigService } from '../../config/environment-config.service';
import { LocalStrategy, JwtStrategy } from '../../middleware/authenticate.middleware';
import { RolesGuard } from '../../middleware/authorize.middleware';
import { FriendListRepository } from '../../repository/friendList.repository';
import { UserRepository } from '../../repository/user.repository';
import { PasswordEncoder } from '../../utils/crypto.util';
import { DatabaseModule } from '../persistance/db.module';
import { userProvider, friendListProvider } from '../persistance/db.providers';
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
            expiresIn: '30d',
          },
        };
      },
      inject: [EnvironmentConfigService],
    }),
    DatabaseModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
