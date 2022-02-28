import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentConfigModule } from 'src/config/config.module';
import { EnvironmentConfigService } from 'src/config/environment-config.service';
import { LocalStrategy, JwtStrategy } from 'src/middleware/authenticate.middleware';
import { RolesGuard } from 'src/middleware/authorize.middleware';
import { UserRepository } from 'src/repository/user.repository';
import { User, UserSchema } from 'src/schemas/user.schema';
import { PasswordEncoder } from 'src/utils/crypto.util';
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
  ],
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  ],
  exports: [AuthService]
})
export class AuthModule {}
