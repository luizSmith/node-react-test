import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
    type: ObterLivroResponse,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'BAD_GATEWAY',
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'NOT_FOUND',
    type: RegraDeNegocioException,
  })
  async obterLivros(): Promise<ObterLivroResponse[]> {
    return await this._livrosService.obterLivros();
  }

  @Get(':idLivro')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sucesso',
    type: ObterLivroResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'BAD_GATEWAY',
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'NOT_FOUND',
    type: RegraDeNegocioException,
  })
  async obterLivrosId(
    @Param() parametros: ObterLivrosIdRequest
  ): Promise<ObterLivroResponse> {
    return await this._livrosService.obterLivrosId(parametros.idLivro);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sucesso',
    type: ObterLivroResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'BAD_GATEWAY',
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'NOT_FOUND',
    type: RegraDeNegocioException,
  })
  async criarLivro(@Body() parametros: CriarLivroRequest): Promise<ObterLivroResponse> {
    return await this._livrosService.criarLivro(parametros);
  }

  @Delete(':idLivro')
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Sucesso'
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'BAD_GATEWAY',
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'NOT_FOUND',
    type: RegraDeNegocioException,
  })
  async deletarPessoaId(
    @Param() parametros: ObterLivrosIdRequest
  ): Promise<void> {
    await this._livrosService.desativarLivro(parametros.idLivro);
  }

  @Put(':idLivro')
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Sucesso'
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'BAD_GATEWAY',
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'NOT_FOUND',
    type: RegraDeNegocioException,
  })
  async atualizarPessoa(
    @Param() parametros: ObterLivrosIdRequest,
    @Body() body: AtualizarLivroRequest
  ): Promise<void> {
    await this._livrosService.atualizarLivro(parametros.idLivro, body);
  }
}
