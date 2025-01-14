import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorRepository } from './administrador.repository';
import { Administrador } from './entity/administrador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Administrador])],
  providers: [AdministradorRepository],
  exports: [AdministradorRepository],
})
export class AdministradorRepositoryModule {}
