import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as morgan from 'morgan';

async function startup() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: "*", credentials: false})
  // app.use(helmet());
  app.use(morgan('dev'));
  await app.listen(5000);
}
startup();
