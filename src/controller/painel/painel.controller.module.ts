import { Module } from '@nestjs/common';
import { PainelController } from './painel.controller';
import { PainelServiceModule } from 'src/service/painel/painel.service.module';

@Module({
    controllers: [PainelController],
    imports: [PainelServiceModule],
})
export class PainelControllerModule { }