import { Module } from '@nestjs/common';
import { AutorController } from './autor.controller';
import { AutorServiceModule } from 'src/service/autor/autor.service.module';

@Module({
    controllers: [AutorController],
    imports: [AutorServiceModule],
})
export class AutorControllerModule { }