import { Module } from '@nestjs/common';
import { AluguelRepositoryModule } from 'src/repository/aluguel/aluguel.repository.module';
import { AluguelService } from './aluguel.service';

@Module({
    imports: [AluguelRepositoryModule],
    providers: [AluguelService],
    exports: [AluguelService],
})
export class AluguelServiceModule { }