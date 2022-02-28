import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';

async function startup() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: "*", credentials: false})
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  app.use(morgan('dev'));
  await app.listen(PORT);
}
startup();
