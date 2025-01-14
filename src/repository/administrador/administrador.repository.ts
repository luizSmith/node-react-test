import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Administrador } from "./entity/administrador.entity";
import { Repository } from "typeorm";
import { ObterAdministradorDTO } from "src/model/administrador/obterAdministrador.dto";


@Injectable()
export class AdministradorRepository {
  constructor(
    @InjectRepository(Administrador)
    private readonly _administradorRepository: Repository<Administrador>
  ) { }

  async obterAdministrador(
    parametros: ObterAdministradorDTO
  ): Promise<Administrador> {
    const administrador = await this._administradorRepository
      .createQueryBuilder('administrador')
      .select()
      .where('administrador.email = :email', { email: parametros.email })
      .andWhere('administrador.senha = :senha', { senha: parametros.senha })
      .getRawOne();

    return administrador;
  }
}
