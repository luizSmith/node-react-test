import { Injectable } from "@nestjs/common";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { CriarCidadeDAO } from "src/model/cidade/dao/criarCidade.dao";
import { CriarCidadeDTO } from "src/model/cidade/dto/criarCidade.dto";
import { ObterCidadeDTO } from "src/model/cidade/dto/obterCidade.dto";
import { CidadeRepository } from "src/repository/cidade/cidade.repository";

@Injectable()
export class CidadeService {
    constructor(
        private _cidadeRepository: CidadeRepository,
    ) { }

    async obterCidadeNomeUf(parametros: ObterCidadeDTO): Promise<CriarCidadeDAO> {
        try {
            return await this._cidadeRepository.obterCidadeNomeUf(parametros);

        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao obter cidade"], 400
            );
        }
    }

    async criarCidade(parametros: CriarCidadeDTO): Promise<CriarCidadeDAO> {
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