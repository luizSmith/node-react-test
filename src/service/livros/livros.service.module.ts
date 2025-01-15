import { Module } from '@nestjs/common';
import { LivrosService } from './livros.service';
import { LivrosRepositoryModule } from 'src/repository/livros/livros.repository.module';
import { AutorServiceModule } from '../autor/autor.service.module';

@Module({
  imports: [
    LivrosRepositoryModule,

    AutorServiceModule

  ],
  providers: [LivrosService],
  exports: [LivrosService],
})
export class LivrosServiceModule { }
