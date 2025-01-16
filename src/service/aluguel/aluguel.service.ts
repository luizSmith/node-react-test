import { Injectable } from "@nestjs/common";
import { RegistrarAlugueRequest } from "src/controller/aluguel/request/registrarAluguel.request";
import { RegistrarAluguelResponse } from "src/controller/aluguel/response/registrarAluguel.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ObterCopiasDisponiveisDAO } from "src/model/aluguel/dao/obterAluguel.dao";
import { RegistrarAluguelDTO } from "src/model/aluguel/dto/registrarAluguel.dto";
import { AluguelRepository } from "src/repository/aluguel/aluguel.repository";
import { Aluguel } from "src/repository/aluguel/entity/aluguel.entity";

@Injectable()
export class AluguelService {
    constructor(private _aluguelRepository: AluguelRepository) { }

    async registrarAluguel(parametros: RegistrarAlugueRequest): Promise<RegistrarAluguelResponse> {
        const aluguelExiste = await this._aluguelRepository.obterAluguelExistenteCopiaId(parametros.idCopia);

        if (aluguelExiste) {
            throw new RegraDeNegocioException(['Cópia ainda não foi devolvida'], 400);
        }

        const parametrosAluguel: RegistrarAluguelDTO = {
            idCopiaLivro: parametros.idCopia,
            idPessoa: parametros.idPessoa,
            dtRetirada: new Date(),
            dtPrazo: parametros.dataPrazo
        }

        const aluguel = await this._aluguelRepository.registrarAluguel(parametrosAluguel);

        return aluguel;
    }

    async obterQuantidadeDisponiveisLivroId(idLivro: number): Promise<ObterCopiasDisponiveisDAO> {
        const dadosLivro = await this._aluguelRepository.obterCopiasDisponiveis(idLivro);

        if (dadosLivro.quantidadeDisponivel <= 0) {
            throw new RegraDeNegocioException(['Não existe cópias disponiveis'], 404);
        }

        return dadosLivro;
    }
}