import { Strategy } from 'passport-local';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';
import { EnvironmentConfigService } from '../config/environment-config.service';
import { UserRepository } from '../repository/user.repository';
import { PasswordEncoder } from '../utils/crypto.util';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private passwordEnCoder: PasswordEncoder,
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ email: username });
    if (
      !user ||
      !this.passwordEnCoder.comparePassword(user?.password, password)
    ) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(private configuration: EnvironmentConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration.getSecretKey(),
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}

@Injectable()
export class JwtAuthenticateGuard extends AuthGuard('jwt') {}

@Injectable()
export class LocalAuthenticateGuard extends AuthGuard('local') {}
