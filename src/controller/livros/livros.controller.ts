import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LivrosService } from 'src/service/livros/livros.service';
import { ObterLivrosIdRequest } from './request/obterLivrosId.request';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exception';
import { ObterLivroResponse } from './reseponse/obterLivro.response';
import { AtualizarLivroRequest, CriarLivroRequest } from './request/criarLivros.request';

@Controller('livros')
@ApiTags('Livros')
export class LivrosController {
  constructor(private readonly _livrosService: LivrosService) { }

  @Get()
  @ApiOperation({
    summary: 'Obter todos os livros',
    description: 'Retorna uma lista de todos os livros cadastrados no sistema. Pode ser utilizado para obter informações detalhadas de cada livro.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna a lista de livros cadastrados no sistema.',
    type: ObterLivroResponse,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: RegraDeNegocioException,
  })
  async obterLivros(): Promise<ObterLivroResponse[]> {
    return await this._livrosService.obterLivros();
  }

  @Get(':idLivro')
  @ApiOperation({
    summary: 'Obter um livro específico',
    description: 'Retorna os detalhes de um livro específico baseado no idLivro fornecido.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna os detalhes do livro com o id fornecido.',
    type: ObterLivroResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: RegraDeNegocioException,
  })
  async obterLivrosId(
    @Param() parametros: ObterLivrosIdRequest
  ): Promise<ObterLivroResponse> {
    return await this._livrosService.obterLivrosId(parametros.idLivro);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo livro',
    description: 'Permite cadastrar um novo livro no sistema. É necessário fornecer as informações obrigatórias do livro.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Livro criado com sucesso.',
    type: ObterLivroResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: RegraDeNegocioException,
  })
  async criarLivro(@Body() parametros: CriarLivroRequest): Promise<ObterLivroResponse> {
    return await this._livrosService.criarLivro(parametros);
  }

  @Delete(':idLivro')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Desativar um livro',
    description: 'Permite desativar um livro do sistema, especificando o idLivro. O livro será desativado e não estará mais disponível para empréstimo.',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Livro desativado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: RegraDeNegocioException,
  })
  async deletarPessoaId(
    @Param() parametros: ObterLivrosIdRequest
  ): Promise<void> {
    await this._livrosService.desativarLivro(parametros.idLivro);
  }

  @Put(':idLivro')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Atualizar informações de um livro',
    description: 'Permite atualizar os detalhes de um livro existente no sistema. O idLivro especificado deve ser válido e os campos a serem atualizados devem ser passados no corpo da requisição.',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Livro atualizado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: RegraDeNegocioException,
  })
  async atualizarPessoa(
    @Param() parametros: ObterLivrosIdRequest,
    @Body() body: AtualizarLivroRequest
  ): Promise<void> {
    await this._livrosService.atualizarLivro(parametros.idLivro, body);
  }
}
