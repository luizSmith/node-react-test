import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdministradorRepositoryModule } from 'src/repository/administrador/administrador.repository.module';

@Module({
  imports: [AdministradorRepositoryModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthServiceModule {}
