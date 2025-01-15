import { Module } from '@nestjs/common';
import { LivrosController } from './livros.controller';
import { LivrosServiceModule } from 'src/service/livros/livros.service.module';

@Module({
  controllers: [LivrosController],
  imports: [LivrosServiceModule],
})
export class LivrosControllerModule {}
