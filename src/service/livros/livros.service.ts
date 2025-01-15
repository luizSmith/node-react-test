import { Injectable } from '@nestjs/common';
import { AtualizarLivroRequest, CriarLivroRequest } from 'src/controller/livros/request/criarLivros.request';
import { ObterLivroResponse } from 'src/controller/livros/reseponse/obterLivro.response';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { LivrosRepository } from 'src/repository/livros/livros.repository';
import { AutorService } from '../autor/autor.service';
import { Livros } from 'src/repository/livros/entity/livros.entity';
import { ObterAutorResponse } from 'src/controller/autor/response/obterAutor.response';

@Injectable()
export class LivrosService {
  constructor(
    private _livrosRepository: LivrosRepository,
    private _autorService: AutorService
  ) { }

  async obterLivros(): Promise<ObterLivroResponse[]> {
    return await this._livrosRepository.obterLivros();
  }

  async obterLivrosId(idLivro: number): Promise<ObterLivroResponse> {
    const livro = await this._livrosRepository.obterLivrosId(idLivro);

    if (!livro) {
      throw new RegraDeNegocioException(['Livro não existe'], 404);
    }

    return livro;
  }

  async criarLivro(parametros: CriarLivroRequest): Promise<ObterLivroResponse> {
    const autor = await this._autorService.obterAutorId(parametros.idAutor);

    try {
      const livro = await this._livrosRepository.criarLivro(parametros);

      return await this.__mappingCriarLivroResponse(livro, autor);
    } catch (error) {
      console.error(error)
      throw new RegraDeNegocioException(
        ["Erro ao criar livro"], 400
      );
    }
  }

  async atualizarLivro(idLivro: number, parametros: AtualizarLivroRequest): Promise<void> {
    await this.obterLivrosId(idLivro);
    await this._autorService.obterAutorId(parametros.idAutor);

    try {

      await this._livrosRepository.atualizarLivro(idLivro, parametros);

    } catch (error) {
      console.error(error)
      throw new RegraDeNegocioException(
        ["Erro ao atualizar livro"], 400
      );
    }
  }

  private __mappingCriarLivroResponse(livro: Livros, autor: ObterAutorResponse): ObterLivroResponse {
    const responseLivro: ObterLivroResponse = {
      id: livro.id,
      nomeLivro: livro.nome,
      lancamento: livro.lancamento,
      nomeAutor: autor.nome
    }

    return responseLivro;
  }

  async desativarLivro(idLivro: number): Promise<void> {
    await this.obterLivrosId(idLivro);

    try {

      await this._livrosRepository.deletarLivroId(idLivro);

    } catch (error) {
      console.error(error)
      throw new RegraDeNegocioException(
        ["Erro ao desativar livro"], 400
      );
    }
  }
}
