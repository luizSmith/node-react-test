import { Injectable } from "@nestjs/common";
import { FinalizarAlugueRequest, RegistrarAlugueRequest } from "src/controller/aluguel/request/registrarAluguel.request";
import { RegistrarAluguelResponse } from "src/controller/aluguel/response/registrarAluguel.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ObterCopiasDisponiveisDAO } from "src/model/aluguel/dao/obterAluguel.dao";
import { AtualizarAluguelDTO, RegistrarAluguelDTO } from "src/model/aluguel/dto/registrarAluguel.dto";
import { AluguelRepository } from "src/repository/aluguel/aluguel.repository";
import { Aluguel } from "src/repository/aluguel/entity/aluguel.entity";
import { PessoaService } from "../pessoa/pessoa.service";

@Injectable()
export class AluguelService {
    constructor(
        private _aluguelRepository: AluguelRepository,
        private _pessoaService: PessoaService
    ) { }

    async registrarAluguel(parametros: RegistrarAlugueRequest): Promise<RegistrarAluguelResponse> {
        const aluguelExiste = await this._aluguelRepository.obterAluguelExistenteCopiaId(parametros.idCopia);

        if (aluguelExiste) {
            throw new RegraDeNegocioException(['Cópia ainda não foi devolvida'], 400);
        }

        await this._pessoaService.obterPessoaId(parametros.idPessoa);

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

    async finalizarAluguel(idAluguel: number): Promise<void> {
        const aluguelExiste = await this._aluguelRepository.obterAluguelId(idAluguel);

        if (!aluguelExiste) {
            throw new RegraDeNegocioException(['Cópia não foi alugada'], 400);
        }

        const parametrosDevolucao: AtualizarAluguelDTO = {
            dtDevolucao: new Date()
        }

        await this._aluguelRepository.finalizarAluguel(idAluguel, parametrosDevolucao);
    }
}