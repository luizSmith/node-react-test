import { Module } from '@nestjs/common';
import { AluguelController } from './aluguel.controller';
import { AluguelServiceModule } from 'src/service/aluguel/aluguel.service.module';

@Module({
    controllers: [AluguelController],
    imports: [AluguelServiceModule],
})
export class AluguelControllerModule { }