import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cidade } from "./entity/cidade.entity";
import { Repository } from "typeorm";
import { ObterCidadeDTO } from "src/model/cidade/dto/obterCidade.dto";
import { CriarCidadeDTO } from "src/model/cidade/dto/criarCidade.dto";


@Injectable()
export class CidadeRepository {
    constructor(
        @InjectRepository(Cidade)
        private readonly _cidadeRepository: Repository<Cidade>
    ) { }

    async obterCidadeNomeUf(parametros: ObterCidadeDTO): Promise<Cidade> {
        return await this._cidadeRepository.createQueryBuilder('cidade')
            .where('cidade.nm_cidade = :nome', { nome: parametros.nome })
            .andWhere('cidade.sg_uf = :uf', { uf: parametros.uf })
            .getOne()
    }

    async criarCidade(parametros: CriarCidadeDTO): Promise<Cidade> {
        return await this._cidadeRepository.create({
            ...parametros
        }).save()
    }
}