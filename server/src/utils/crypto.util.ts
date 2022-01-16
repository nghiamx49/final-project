import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class PasswordEncoder {
  encodePassword(rawPassword: string) {
    return CryptoJS.AES.encrypt(
      rawPassword,
      process.env.ENCRYPT_KEY,
    ).toString();
  }
  comparePassword(hashPassword: string, rawPassword: string): boolean {
    return (
      CryptoJS.AES.decrypt(hashPassword, process.env.ENCRYPT_KEY).toString(
        CryptoJS.enc.Utf8,
      ) === rawPassword
    );
  }
}
