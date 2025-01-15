import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './entity/autor.entity';
import { AutorRepository } from './autor.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Autor])],
    providers: [AutorRepository],
    exports: [AutorRepository],
})
export class AutorRepositoryModule { }