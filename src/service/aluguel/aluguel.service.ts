import { Injectable } from "@nestjs/common";
import { RegistrarAlugueRequest } from "src/controller/aluguel/request/registrarAluguel.request";
import { RegistrarAluguelResponse } from "src/controller/aluguel/response/registrarAluguel.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ObterAluguelExistenteCopiaIdDAO, ObterCopiasDisponiveisDAO } from "src/model/aluguel/dao/obterAluguel.dao";
import { AtualizarAluguelDTO, RegistrarAluguelDTO } from "src/model/aluguel/dto/registrarAluguel.dto";
import { AluguelRepository } from "src/repository/aluguel/aluguel.repository";
import { PessoaService } from "../pessoa/pessoa.service";

@Injectable()
export class AluguelService {
    constructor(
        private _aluguelRepository: AluguelRepository,
        private _pessoaService: PessoaService
    ) { }

    async registrarAluguel(parametros: RegistrarAlugueRequest): Promise<RegistrarAluguelResponse> {
        await this._pessoaService.obterPessoaId(parametros.idPessoa);
        await this._validarAtraso(parametros.idPessoa);

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

    private async _validarAtraso(idPessoa: number): Promise<void> {
        const aluguel = await this._aluguelRepository.obterAtrasosPessoaId(idPessoa);

        if (aluguel.length > 2) {
            throw new RegraDeNegocioException(['Pessoa bloqueada por conter 2 atrasos'], 400);
        }
    }

    async obterAluguelPessoaId(idPessoa: number): Promise<ObterAluguelExistenteCopiaIdDAO[]> {
        await this._pessoaService.obterPessoaId(idPessoa);

        return await this._aluguelRepository.obterAluguelPessoaId(idPessoa);
    }
}