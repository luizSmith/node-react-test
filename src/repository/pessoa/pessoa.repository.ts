import { Injectable } from "@nestjs/common";
import { Pessoa } from "./entity/pessoas.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AtualizarPessoaDTO, CriarPessoaDTO } from "src/model/pessoa/dto/criarPessoa.dto";
import { Cidade } from "../cidade/entity/cidade.entity";
import { ObterPessoaDAO } from "src/model/pessoa/dao/obterPessoa.dao";

@Injectable()
export class PessoaRepository {
    constructor(
        @InjectRepository(Pessoa)
        private readonly _pessoaRepository: Repository<Pessoa>
    ) { }

    async obterPessoa(): Promise<ObterPessoaDAO[]> {
        const pessoa = await this._pessoaRepository
            .createQueryBuilder('pessoa')
            .select('pessoa.cd_pessoa', 'id')
            .addSelect('pessoa.nm_pessoa', 'nome')
            .addSelect('pessoa.nm_logradouro', 'logradouro')
            .addSelect('pessoa.cd_cpf', 'cpf')
            .addSelect('pessoa.ic_ativo', 'ativo')
            .addSelect('pessoa.dt_nascimento', 'dataNascimento')
            .addSelect('pessoa.vl_numero', 'numero')
            .addSelect('cidade.nm_cidade', 'cidade')
            .addSelect('cidade.sg_uf', 'estado')
            .innerJoin(Cidade, 'cidade', 'cidade.cd_cidade = pessoa.cd_cidade')
            .getRawMany<ObterPessoaDAO>();

        return pessoa;
    }

    async obterPessoaId(idPessoa: number): Promise<ObterPessoaDAO> {
        const pessoa = await this._pessoaRepository
            .createQueryBuilder('pessoa')
            .select('pessoa.cd_pessoa', 'id')
            .addSelect('pessoa.nm_pessoa', 'nome')
            .addSelect('pessoa.nm_logradouro', 'logradouro')
            .addSelect('pessoa.cd_cpf', 'cpf')
            .addSelect('pessoa.ic_ativo', 'ativo')
            .addSelect('pessoa.dt_nascimento', 'dataNascimento')
            .addSelect('pessoa.vl_numero', 'numero')
            .addSelect('cidade.nm_cidade', 'cidade')
            .addSelect('cidade.sg_uf', 'estado')
            .innerJoin(Cidade, 'cidade', 'cidade.cd_cidade = pessoa.cd_cidade')
            .where(`pessoa.cd_pessoa = :idPessoa`, { idPessoa })
            .getRawOne<ObterPessoaDAO>()

        return pessoa;
    }

    async criarPessoa(parametros: CriarPessoaDTO): Promise<Pessoa> {
        return await this._pessoaRepository.create({
            ...parametros,
            ativo: true
        }).save();
    }

    async deletarPessoaId(idPessoa: number): Promise<number> {
        const pessoa = await this._pessoaRepository.update(
            {
                id: idPessoa
            },
            {
                ativo: false,
            }
        );

        return pessoa.affected || 0;
    }

    async atualizarPessoa(idPessoa: number, parametros: AtualizarPessoaDTO): Promise<number> {
        const pessoa = await this._pessoaRepository.update(
            {
                id: idPessoa
            },
            {
                ...parametros
            }
        );

        return pessoa.affected || 0;
    }
}