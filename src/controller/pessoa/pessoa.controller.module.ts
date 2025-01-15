import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaServiceModule } from 'src/service/pessoa/pessoa.service.module';

@Module({
    controllers: [PessoaController],
    imports: [PessoaServiceModule],
})
export class PessoaControllerModule { }