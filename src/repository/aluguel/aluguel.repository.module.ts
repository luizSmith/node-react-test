import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluguel } from './entity/aluguel.entity';
import { AluguelRepository } from './aluguel.repository';
import { Livros } from '../livros/entity/livros.entity';
import { Copias } from '../copias/entity/copias.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Aluguel, Livros, Copias])],
    providers: [AluguelRepository],
    exports: [AluguelRepository],
})
export class AluguelRepositoryModule { }