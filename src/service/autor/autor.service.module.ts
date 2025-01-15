import { Module } from '@nestjs/common';
import { AutorRepositoryModule } from 'src/repository/autor/autor.repository.module';
import { AutorService } from './autor.service';

@Module({
    imports: [AutorRepositoryModule],
    providers: [AutorService],
    exports: [AutorService],
})
export class AutorServiceModule { }