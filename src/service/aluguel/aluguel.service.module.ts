import { Module } from '@nestjs/common';
import { AluguelRepositoryModule } from 'src/repository/aluguel/aluguel.repository.module';
import { AluguelService } from './aluguel.service';
import { PessoaServiceModule } from '../pessoa/pessoa.service.module';

@Module({
    imports: [
        AluguelRepositoryModule,
        PessoaServiceModule
    ],
    providers: [AluguelService],
    exports: [AluguelService],
})
export class AluguelServiceModule { }