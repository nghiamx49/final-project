import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  private readonly connectionString: string;
  private readonly encryptKey: string;
  private readonly secretKey: string;
  private readonly ADMIN: string;
  private readonly USER: string;
  private readonly email: string;
  private readonly password: string;

  constructor(private readonly configService: ConfigService) {
    this.connectionString = configService.get<string>('DATABASE_URL');
    this.encryptKey = configService.get<string>('ENCRYPT_KEY');
    this.secretKey = configService.get<string>('SECRET_KEY');
    this.ADMIN = configService.get<string>('ADMIN');
    this.USER = configService.get<string>('USER');
    this.email = configService.get<string>('SMTP_USER');
    this.password = configService.get<string>('SMTP_PASS');
  }

  getConnectionString = (): string => this.connectionString;
  getEncryptKey = (): string => this.encryptKey;
  getSecretKey = (): string => this.secretKey;
  getAdminRole = (): string => this.ADMIN;
  getUserRole = (): string => this.USER;
  getEmail = (): string => this.email;
  getPass = (): string => this.password;
}
