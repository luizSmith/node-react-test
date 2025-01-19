import { Module } from '@nestjs/common';
import { PainelRepositoryModule } from 'src/repository/painel/painel.repository.module';
import { PainelService } from './painel.service';

@Module({
    imports: [
        PainelRepositoryModule,
    ],
    providers: [PainelService],
    exports: [PainelService],
})
export class PainelServiceModule { }