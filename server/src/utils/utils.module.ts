import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/config/config.module';
import { EnvironmentConfigService } from 'src/config/environment-config.service';
import { PasswordEncoder } from './crypto.util';
import { EmailUtil } from './email.util';

@Module({
  providers: [EmailUtil, PasswordEncoder],
  exports: [EmailUtil, PasswordEncoder],
})
export class UtilModule {}
