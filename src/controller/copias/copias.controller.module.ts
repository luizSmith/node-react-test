import { Module } from '@nestjs/common';
import { CopiasServiceModule } from 'src/service/copias/copias.service.module';
import { CopiasController } from './copias.controller';

@Module({
    controllers: [CopiasController],
    imports: [CopiasServiceModule],
})
export class CopiasControllerModule { }
