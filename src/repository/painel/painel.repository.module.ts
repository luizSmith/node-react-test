import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PainelRepository } from './painel.repository';
import { Aluguel } from '../aluguel/entity/aluguel.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Aluguel])],
    providers: [PainelRepository],
    exports: [PainelRepository],
})
export class PainelRepositoryModule { }