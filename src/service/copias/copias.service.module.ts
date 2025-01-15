import { Module } from '@nestjs/common';
import { AutorServiceModule } from '../autor/autor.service.module';
import { CopiasService } from './copias.service';
import { LivrosServiceModule } from '../livros/livros.service.module';
import { CopiasRepositoryModule } from 'src/repository/copias/copias.repository.module';

@Module({
    imports: [
        CopiasRepositoryModule,

        LivrosServiceModule,
    ],
    providers: [CopiasService],
    exports: [CopiasService],
})
export class CopiasServiceModule { }