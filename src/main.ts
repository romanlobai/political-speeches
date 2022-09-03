import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import CONFIG from '@application-config';
import { Logger, ValidationPipe } from '@nestjs/common';
const { PORT, CORS_ALLOWED_ORIGINS } = CONFIG;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: CORS_ALLOWED_ORIGINS });
  app.use(helmet());

  await app.listen(
    PORT,
    () => Logger.log(`Server is listening on port: ${PORT}`, 'NestApplication'),
  );
}
bootstrap();
