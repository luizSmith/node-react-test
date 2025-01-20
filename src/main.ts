import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErroCustomisadoInterceptor } from './infraestructure/interceptors/erroCustomisado.interceptor';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ValidacaoCustomizadaPipe } from './infraestructure/pipe/validacaoCustomizada.pipe';
import { CustomLogger } from './infraestructure/logger/custom.logger';

initializeEnvironmentConfig();

async function bootstrap() {
  initializeTransactionalContext()
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalInterceptors(new ErroCustomisadoInterceptor());
  app.useGlobalPipes(new ValidacaoCustomizadaPipe());

  app.useLogger(app.get(CustomLogger));

  const config = new DocumentBuilder()
    .setTitle('API Biblioteca')
    .setVersion('v1')
    .addSecurity('ApiKeyAuth', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements('ApiKeyAuth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.NODE_PORT || 3000;
  await app.listen(port);
  console.info('APP LISTENING ON PORT: ' + port);
}

function initializeEnvironmentConfig() {
  let path;
  const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';
  switch (nodeEnv) {
    case 'local':
      path = `/../process-local.env`;
      break;
  }

  if (path) {
    dotenv.config({ path: __dirname + path });
  }
}

bootstrap();
