import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Aluguel } from "./entity/aluguel.entity";
import { AtualizarAluguelDTO, RegistrarAluguelDTO } from "src/model/aluguel/dto/registrarAluguel.dto";
import { Livros } from "../livros/entity/livros.entity";
import { Copias } from "../copias/entity/copias.entity";
import { ObterAluguelExistenteCopiaIdDAO, ObterCopiasDisponiveisDAO } from "src/model/aluguel/dao/obterAluguel.dao";
import { RegistrarAluguelDAO } from "src/model/aluguel/dao/registrarAluguel.dao";

@Injectable()
export class AluguelRepository {
    constructor(
        @InjectRepository(Aluguel)
        private readonly _aluguelRepository: Repository<Aluguel>,
        @InjectRepository(Livros)
        private readonly _livrosRepository: Repository<Livros>
    ) { }

    async obterCopiasDisponiveis(idLivro: number): Promise<ObterCopiasDisponiveisDAO> {
        const copia = await this._livrosRepository
            .createQueryBuilder('livro')
            .select([
                'livro.cd_livro id',
                'livro.nm_livro nomeLivro',
                'COUNT(*) quantidadeDisponivel',
            ])
            .innerJoin(Copias, 'copias', 'livro.cd_livro = copias.cd_livro')
            .leftJoin(Aluguel, 'aluguel', 'aluguel.cd_copia = copias.cd_copia')
            .where(`(	
                aluguel.dt_devolucao IS NOT NULL 
                OR 
                aluguel.cd_aluguel IS NULL
            )`)
            .andWhere('livro.ic_ativo = true')
            .andWhere('livro.cd_livro = :idLivro', { idLivro })
            .groupBy('livro.cd_livro')
            .getRawOne<ObterCopiasDisponiveisDAO>();

        return copia;
    }

    async obterAluguelExistenteCopiaId(idCopia: number): Promise<ObterAluguelExistenteCopiaIdDAO> {
        const aluguel = await this._livrosRepository
            .createQueryBuilder('livro')
            .select([
                'livro.cd_livro id',
                'livro.nm_livro nomeLivro',
                'copias.cd_copia idCopia',
                'aluguel.cd_aluguel idAluguel',
            ])
            .innerJoin(Copias, 'copias', 'livro.cd_livro = copias.cd_livro')
            .innerJoin(Aluguel, 'aluguel', 'aluguel.cd_copia = copias.cd_copia')
            .where(`aluguel.dt_devolucao IS NULL`)
            .andWhere('livro.ic_ativo = true')
            .andWhere('copias.cd_copia = :idCopia', { idCopia })
            .getRawOne<ObterAluguelExistenteCopiaIdDAO>();

        return aluguel;
    }

    async obterAluguelId(idAluguel: number): Promise<ObterAluguelExistenteCopiaIdDAO> {
        const aluguel = await this._livrosRepository
            .createQueryBuilder('livro')
            .select([
                'livro.cd_livro idLivro',
                'livro.nm_livro nomeLivro',
                'copias.cd_copia idCopia',
                'aluguel.cd_aluguel idAluguel'
            ])
            .innerJoin(Copias, 'copias', 'livro.cd_livro = copias.cd_livro')
            .innerJoin(Aluguel, 'aluguel', 'aluguel.cd_copia = copias.cd_copia')
            .where(`aluguel.dt_devolucao IS NULL`)
            .andWhere('livro.ic_ativo = true')
            .andWhere('aluguel.cd_aluguel = :idAluguel', { idAluguel })
            .getRawOne<ObterAluguelExistenteCopiaIdDAO>();

        return aluguel;
    }

    async registrarAluguel(parametros: RegistrarAluguelDTO): Promise<RegistrarAluguelDAO> {
        return await this._aluguelRepository.create({
            ...parametros,
        }).save();
    }

    async finalizarAluguel(idAluguel: number, parametros: AtualizarAluguelDTO): Promise<number> {
        const livro = await this._aluguelRepository.update(
            {
                id: idAluguel
            },
            {
                ...parametros
            }
        );

        return livro.affected || 0;
    }

    async obterAtrasosPessoaId(idPessoa: number): Promise<ObterAluguelExistenteCopiaIdDAO[]> {
        const aluguel = await this._livrosRepository
            .createQueryBuilder('livro')
            .select([
                'livro.cd_livro idLivro',
                'livro.nm_livro nomeLivro',
                'copias.cd_copia idCopia',
                'aluguel.cd_aluguel idAluguel'
            ])
            .innerJoin(Copias, 'copias', 'livro.cd_livro = copias.cd_livro')
            .innerJoin(Aluguel, 'aluguel', 'aluguel.cd_copia = copias.cd_copia')
            .where(`aluguel.dt_devolucao > aluguel.dt_prazo`)
            .andWhere('aluguel.cd_pessoa = :idPessoa', { idPessoa })
            .getRawMany<ObterAluguelExistenteCopiaIdDAO>();

        return aluguel;
    }

    async obterAluguelPessoaId(idPessoa: number): Promise<ObterAluguelExistenteCopiaIdDAO[]> {
        const aluguel = await this._livrosRepository
            .createQueryBuilder('livro')
            .select([
                'livro.cd_livro idLivro',
                'livro.nm_livro nomeLivro',
                'copias.cd_copia idCopia',
                'aluguel.cd_aluguel idAluguel'
            ])
            .innerJoin(Copias, 'copias', 'livro.cd_livro = copias.cd_livro')
            .innerJoin(Aluguel, 'aluguel', 'aluguel.cd_copia = copias.cd_copia')
            .where(`aluguel.dt_devolucao IS NULL`)
            .andWhere('aluguel.cd_pessoa = :idPessoa', { idPessoa })
            .getRawMany<ObterAluguelExistenteCopiaIdDAO>();

        return aluguel;
    }
}