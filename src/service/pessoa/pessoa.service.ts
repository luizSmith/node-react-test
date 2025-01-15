import { Injectable } from "@nestjs/common";
import { AtualizarPessoaRequest, CriarPessoaRequest } from "src/controller/pessoa/request/criarPessoa.request";
import { ObterPessoaResponse } from "src/controller/pessoa/response/obterPessoa.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { PessoaRepository } from "src/repository/pessoa/pessoa.repository";
import { ViaCepClient } from "src/repository/client/viaCep/viaCep.client";
import { CidadeService } from "../cidade/cidade.service";
import { Cidade } from "src/repository/cidade/entity/cidade.entity";
import { AtualizarPessoaDTO, CriarPessoaDTO } from "src/model/pessoa/dto/criarPessoa.dto";
import { Pessoa } from "src/repository/pessoa/entity/pessoas.entity";
import { Transactional } from "typeorm-transactional";

@Injectable()
export class PessoaService {
    constructor(
        private _pessoaRepository: PessoaRepository,
        private _viaCepClient: ViaCepClient,
        private _cidadeService: CidadeService,
    ) { }

    async obterPessoa(): Promise<ObterPessoaResponse[]> {
        return await this._pessoaRepository.obterPessoa();
    }

    async obterPessoaId(idPessoa: number): Promise<ObterPessoaResponse> {
        const pessoa = await this._pessoaRepository.obterPessoaId(idPessoa);

        if (!pessoa) {
            throw new RegraDeNegocioException(['idPessoa não é válido'], 400);
        }

        return pessoa
    }

    async desativarPessoaId(idPessoa: number): Promise<void> {
        await this.obterPessoaId(idPessoa);

        await this._pessoaRepository.deletarPessoaId(idPessoa);
    }

    @Transactional()
    async criarPessoa(parametros: CriarPessoaRequest): Promise<ObterPessoaResponse> {
        const cidade = await this._tratarCidade(parametros.cep);

        const parametrosPessoa: CriarPessoaDTO = {
            nome: parametros.nome,
            cpf: parametros.cpf,
            dataNascimento: parametros.dataNascimento,
            logradouro: parametros.logradouro,
            numero: parametros.numero,
            referencia: parametros.referencia,
            cidade: cidade.id
        }

        try {

            const pessoa = await this._pessoaRepository.criarPessoa(parametrosPessoa);

            return this._mappingCriarPessoaResponse(pessoa, cidade);

        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao criar pessoa"], 400
            );
        }
    }

    private async _tratarCidade(cep: string): Promise<Cidade> {
        const endereco = await this._viaCepClient.obterEnderecoPeloCep(cep)

        if (!endereco) {
            throw new RegraDeNegocioException(['Cep não é válido'], 400);
        }

        let cidade = await this._cidadeService.obterCidadeNomeUf({
            nome: endereco.localidade,
            uf: endereco.uf
        });

        if (!cidade) {
            cidade = await this._cidadeService.criarCidade({
                nome: endereco.localidade,
                uf: endereco.uf
            });
        }

        return cidade;
    }

    private _mappingCriarPessoaResponse(pessoa: Pessoa, cidade: Cidade): ObterPessoaResponse {
        const pessoaResponse: ObterPessoaResponse = {
            id: pessoa.id,
            nome: pessoa.nome,
            cpf: pessoa.cpf,
            dataNascimento: pessoa.dataNascimento,
            logradouro: pessoa.logradouro,
            numero: pessoa.numero,
            referencia: pessoa.referencia,
            cidade: cidade.nome,
            ativo: pessoa.ativo,
            estado: cidade.uf
        }

        return pessoaResponse;
    }

    @Transactional()
    async atualizarPessoa(idPessoa: number, parametros: AtualizarPessoaRequest): Promise<void> {
        const cidade = await this._tratarCidade(parametros.cep);

        const parametrosPessoa: AtualizarPessoaDTO = {
            nome: parametros.nome,
            cpf: parametros.cpf,
            logradouro: parametros.logradouro,
            numero: parametros.numero,
            referencia: parametros.referencia,
            cidade: cidade.id,
            ativo: parametros.ativo,
        }

        try {

            await this._pessoaRepository.atualizarPessoa(idPessoa, parametrosPessoa)

        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao atualizar pessoa"], 400
            );
        }
    }
}