
import { Module } from '@nestjs/common';
import { CidadeServiceModule } from '../cidade/cidade.service.module';
import { PessoaRepositoryModule } from 'src/repository/pessoa/pessoa.repository.module';
import { ViaCepClientModule } from 'src/repository/viaCep/viaCep.client.module';
import { PessoaService } from './pessoa.service';

@Module({
    imports: [
        PessoaRepositoryModule,

        ViaCepClientModule,

        CidadeServiceModule,
    ],
    providers: [PessoaService],
    exports: [PessoaService]
})
export class PessoaServiceModule { }