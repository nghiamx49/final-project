import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/config/config.module';
import { EnvironmentConfigService } from 'src/config/environment-config.service';
import { OTPRepository } from 'src/repository/optvalidation.repository';
import { UserRepository } from 'src/repository/user.repository';
import { EmailUtil } from 'src/utils/email.util';
import { UtilModule } from 'src/utils/utils.module';
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
    userProvider
  ],
  controllers: [ValidationController],
})
export class ValidationModule {}
