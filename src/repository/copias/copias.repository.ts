import { Injectable } from "@nestjs/common";
import { Livros } from "../livros/entity/livros.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Copias } from "./entity/copias.entity";
import { ObterCopiasLivroDAO } from "src/model/copia/dao/obterCopiasLivro.dao";
import { CriarCopiaDTO } from "src/model/copia/dto/criarCopias.dto";
import { Aluguel } from "../aluguel/entity/aluguel.entity";

@Injectable()
export class CopiasRepository {
    constructor(
        @InjectRepository(Copias)
        private readonly _copiasRepository: Repository<Copias>
    ) { }

    async obterCopiasLivroId(idLivro: number): Promise<ObterCopiasLivroDAO[]> {
        const livros = await this._copiasRepository
            .createQueryBuilder('copia')
            .select([
                'copia.cd_copia idCopia',
                'copia.dt_estoque dtEstoque',
                'livros.cd_livro idLivro',
                'livros.nm_livro nomeLivro',
                'IF(aluguel.cd_aluguel IS NULL, "DISPONIVEL", "ALUGADO") status',
            ])
            .innerJoin(Livros, 'livros', 'livros.cd_livro = copia.cd_livro')
            .leftJoin(Aluguel, 'aluguel', 'aluguel.cd_copia = copia.cd_copia')
            .where('livros.ic_ativo = true')
            .andWhere('copia.ic_ativo = true')
            .andWhere('livros.cd_livro = :idLivro', { idLivro })
            .getRawMany<ObterCopiasLivroDAO>();

        return livros;
    }

    async criarCopia(parametros: CriarCopiaDTO[]): Promise<void> {
        await this._copiasRepository.insert(parametros)
    }

    async obterCopiasId(idCopia: number): Promise<ObterCopiasLivroDAO> {
        const livros = await this._copiasRepository
            .createQueryBuilder('copia')
            .select([
                'copia.cd_copia idCopia',
                'copia.dt_estoque dtEstoque',
                'livros.cd_livro idLivro',
                'livros.nm_livro nomeLivro',
                'IF(aluguel.cd_aluguel IS NULL, "DISPONIVEL", "ALUGADO") disponivel',
            ])
            .innerJoin(Livros, 'livros', 'livros.cd_livro = copia.cd_livro')
            .leftJoin(Aluguel, 'aluguel', 'aluguel.cd_copia = copia.cd_copia')
            .where('livros.ic_ativo = true')
            .andWhere('copia.ic_ativo = true')
            .andWhere('copia.cd_copia = :idCopia', { idCopia })
            .getRawOne<ObterCopiasLivroDAO>();

        return livros;
    }

    async deletarCopiaId(idCopia: number): Promise<number> {
        const copia = await this._copiasRepository.update(
            {
                id: idCopia
            },
            {
                ativo: false,
            }
        );

        return copia.affected || 0;
    }
}