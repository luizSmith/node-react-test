import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthControllerModule } from './controller/auth/auth.controller.module';
import { SegurancaMiddleware } from './infraestructure/seguranca/seguranca.interceptor';
import { PessoaControllerModule } from './controller/pessoa/pessoa.controller.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { LivrosControllerModule } from './controller/livros/livros.controller.module';
import { AutorControllerModule } from './controller/autor/autor.controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'process-local.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          port: Number(process.env.PORT_DB) || 3306,
          host: process.env.HOST_DB,
          username: process.env.USERNAME_DB,
          password: process.env.PASSWORD_DB,
          database: process.env.DATABASE,
          logging: process.env.LOGGING == 'true',
          entities: [__dirname + '/**/*.entity{.ts,.js}']
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    AuthControllerModule,
    PessoaControllerModule,
    AutorControllerModule
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
