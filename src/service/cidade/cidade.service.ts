import { Injectable } from "@nestjs/common";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { CriarCidadeDTO } from "src/model/cidade/dto/criarCidade.dto";
import { ObterCidadeDTO } from "src/model/cidade/dto/obterCidade.dto";
import { CidadeRepository } from "src/repository/cidade/cidade.repository";
import { Cidade } from "src/repository/cidade/entity/cidade.entity";

@Injectable()
export class CidadeService {
    constructor(
        private _cidadeRepository: CidadeRepository,
    ) { }

    async obterCidadeNomeUf(parametros: ObterCidadeDTO): Promise<Cidade> {
        try {
            return await this._cidadeRepository.obterCidadeNomeUf(parametros);

        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao obter cidade"], 400
            );
        }
    }

    async criarCidade(parametros: CriarCidadeDTO): Promise<Cidade> {
        try {

            return await this._cidadeRepository.criarCidade(parametros);

        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao criar cidade"], 400
            );
        }
    }

}