import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../../config/environment-config.service';
import { OTPRepository } from '../../repository/optvalidation.repository';
import { UserRepository } from '../../repository/user.repository';
import { EmailUtil } from '../../utils/email.util';
import { DatabaseModule } from '../persistance/db.module';
import { otpProvider, userProvider } from '../persistance/db.providers';
import { ValidationController } from './validation.controller';
import { ValidationService } from './validation.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ValidationService,
    EmailUtil,
    EnvironmentConfigService,
    OTPRepository,
    UserRepository,
    otpProvider,
    userProvider,
  ],
  controllers: [ValidationController],
})
export class ValidationModule {}
