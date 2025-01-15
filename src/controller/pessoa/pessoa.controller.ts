import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exception';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { PessoaService } from 'src/service/pessoa/pessoa.service';
import { ObterPessoaResponse } from './response/obterPessoa.response';
import { ObterPessoaIdRequest } from './request/obterPessoa.request';
import { AtualizarPessoaRequest, CriarPessoaRequest } from './request/criarPessoa.request';

@Controller('pessoas')
@ApiTags('Pessoa')
export class PessoaController {
    constructor(private readonly _pessoaService: PessoaService) { }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterPessoaResponse,
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
    async obterPessoa(): Promise<ObterPessoaResponse[]> {
        return await this._pessoaService.obterPessoa();
    }

    @Get(':idPessoa')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterPessoaResponse,
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
    async obterPessoaId(
        @Param() parametros: ObterPessoaIdRequest
    ): Promise<ObterPessoaResponse> {
        return await this._pessoaService.obterPessoaId(parametros.idPessoa);
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Sucesso',
        type: ObterPessoaResponse,
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
    async criarPessoa(@Body() parametros: CriarPessoaRequest): Promise<ObterPessoaResponse> {
        return await this._pessoaService.criarPessoa(parametros);
    }

    @Delete(':idPessoa')
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
        @Param() parametros: ObterPessoaIdRequest
    ): Promise<void> {
        await this._pessoaService.desativarPessoaId(parametros.idPessoa);
    }

    @Put(':idPessoa')
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
        @Param() parametros: ObterPessoaIdRequest,
        @Body() body: AtualizarPessoaRequest
    ): Promise<void> {
        await this._pessoaService.atualizarPessoa(parametros.idPessoa, body);
    }
}