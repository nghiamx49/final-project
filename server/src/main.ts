import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { User } from './schemas/user.schema';

async function startup() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*', credentials: false });
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    deepScanRoutes: true
  };
    const config = new DocumentBuilder()
      .setTitle('API ENPOINTS')
      .setDescription('The api enpoint of application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api-endpoints', app, document);
  app.use(morgan('dev'));
  await app.listen(PORT, () => {
    console.log(`Server up : ${PORT}`);
  });
}
startup();
