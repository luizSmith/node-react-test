import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Livros } from './entity/livros.entity';
import { Autor } from '../autor/entity/autor.entity';
import { ObterLivroDAO } from 'src/model/livro/dao/obterLivro.dao';
import { AtualizarLivroDTO, CriarLivroDTO } from 'src/model/livro/dto/criarLivro.dto';
import { CriarLivrosDAO } from 'src/model/livro/dao/criarLivro.dao';

@Injectable()
export class LivrosRepository {
  constructor(
    @InjectRepository(Livros)
    private readonly _livrosRepository: Repository<Livros>
  ) { }

  async obterLivros(): Promise<ObterLivroDAO[]> {
    const livros = await this._livrosRepository
      .createQueryBuilder('livro')
      .select([
        'livro.cd_livro id',
        'livro.nm_livro nomeLivro',
        'livro.dt_lancamento',
        'livro.cd_isbn isbn',
        'autor.nm_autor nomeAutor',
      ])
      .innerJoin(Autor, 'autor', 'autor.cd_autor = livro.cd_autor')
      .where('livro.ic_ativo = true')
      .getRawMany<ObterLivroDAO>();

    return livros;
  }

  async obterLivrosId(idLivro: number): Promise<ObterLivroDAO> {
    const livros = await this._livrosRepository
      .createQueryBuilder('livro')
      .select([
        'livro.cd_livro id',
        'livro.nm_livro nomeLivro',
        'livro.dt_lancamento',
        'livro.cd_isbn isbn',
        'autor.nm_autor nomeAutor',
      ])
      .innerJoin(Autor, 'autor', 'autor.cd_autor = livro.cd_autor')
      .where('livro.ic_ativo = true')
      .andWhere('livro.cd_livro = :idLivro', { idLivro })
      .getRawOne();

    return livros;
  }

  async criarLivro(parametros: CriarLivroDTO): Promise<CriarLivrosDAO> {
    return await this._livrosRepository.create({
      ...parametros,
      ativo: true
    }).save();
  }

  async deletarLivroId(idLivro: number): Promise<number> {
    const livro = await this._livrosRepository.update(
      {
        id: idLivro
      },
      {
        ativo: false,
      }
    );

    return livro.affected || 0;
  }

  async atualizarLivro(idLivro: number, parametros: AtualizarLivroDTO): Promise<number> {
    const livro = await this._livrosRepository.update(
      {
        id: idLivro
      },
      {
        ...parametros
      }
    );

    return livro.affected || 0;
  }
}
