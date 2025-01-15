import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livros } from '../livros/entity/livros.entity';
import { CopiasRepository } from './copias.repository';
import { Copias } from './entity/copias.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Livros, Copias])],
    providers: [CopiasRepository],
    exports: [CopiasRepository],
})
export class CopiasRepositoryModule { }