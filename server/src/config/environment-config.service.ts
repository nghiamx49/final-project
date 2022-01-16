import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class EnvironmentConfigService {
  private readonly connectionString: string;
  private readonly encryptKey: string;
  private readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.connectionString = configService.get<string>("DATABASE_URL");
    this.encryptKey = configService.get<string>("ENCRYPT_KEY");
    this.secretKey = configService.get<string>("SECRET_KEY");
  }

  getConnectionString = (): string => this.connectionString;
  getEncryptKey = (): string => this.encryptKey;
  getSecretKey = (): string => this.secretKey;
}
