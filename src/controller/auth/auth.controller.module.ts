import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceModule } from 'src/service/auth/auth.service.module';

@Module({
    controllers: [AuthController],
    imports: [AuthServiceModule],
})
export class AuthControllerModule { }
