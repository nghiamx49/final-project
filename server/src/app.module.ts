import { Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectConnection, MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvironmentConfigService } from './config/environment-config.service';
import { EnvironmentConfigModule } from './config/config.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http.exception';
import { CombineModude } from './modules/combine.module';
import { Connection } from 'mongoose';
import { User } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      useFactory: (database: EnvironmentConfigService) => {
        return <MongooseModuleOptions>{
          uri: database.getConnectionString(),
        };
      },
      inject: [EnvironmentConfigService],
    }),
    CombineModude,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {

}
