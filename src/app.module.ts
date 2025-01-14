import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthControllerModule } from './controller/auth/auth.controller.module';
import { SegurancaMiddleware } from './infraestructure/seguranca/seguranca.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'process-local.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.PORT_DB) || 3306,
      host: process.env.HOST_DB,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      logging: process.env.LOGGING == 'true',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    AuthControllerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(SegurancaMiddleware)
      .exclude(
        {
          path: 'autenticar',
          method: RequestMethod.POST,
        },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
