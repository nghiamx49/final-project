import { Module } from '@nestjs/common';
import { PasswordEncoder } from './crypto.util';
import { EmailUtil } from './email.util';

@Module({
  providers: [EmailUtil, PasswordEncoder],
  exports: [EmailUtil, PasswordEncoder],
})
export class UtilModule {}
