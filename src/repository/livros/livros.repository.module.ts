import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livros } from './entity/livros.entity';
import { LivrosRepository } from './livros.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Livros])],
  providers: [LivrosRepository],
  exports: [LivrosRepository],
})
export class LivrosRepositoryModule {}
