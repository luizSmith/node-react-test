import { Module } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CidadeRepositoryModule } from 'src/repository/cidade/cidade.repository.module';

@Module({
    imports: [
        CidadeRepositoryModule,
    ],
    providers: [CidadeService],
    exports: [CidadeService]
})
export class CidadeServiceModule { }