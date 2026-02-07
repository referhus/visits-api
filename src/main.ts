import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://referhus.github.io/', // или ваш Vue URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;

  app.use(requestIp.mw({ attributeName: 'clientIp' }));

  await app.listen(port, '0.0.0.0')
}
bootstrap();
