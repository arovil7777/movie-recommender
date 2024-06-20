import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const httpsOptions = {
    key: fs.readFileSync(configService.get<string>('SSL_KEY_PATH')),
    cert: fs.readFileSync(configService.get<string>('SSL_CERT_PATH')),
  };

  await app.close();
  const appWithHttps = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });

  await appWithHttps.listen(3000);
}
bootstrap();
