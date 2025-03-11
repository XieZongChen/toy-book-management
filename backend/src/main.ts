import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 校验请求体的参数
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 访问上传的静态资源的设置
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });

  // 支持跨域访问
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
