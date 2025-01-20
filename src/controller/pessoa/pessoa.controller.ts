import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exception';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { PessoaService } from 'src/service/pessoa/pessoa.service';
import { ObterPessoaResponse } from './response/obterPessoa.response';
import { ObterPessoaIdRequest } from './request/obterPessoa.request';
import { AtualizarPessoaRequest, CriarPessoaRequest } from './request/criarPessoa.request';

@Controller('pessoas')
@ApiTags('Pessoas')
export class PessoaController {
    constructor(private readonly _pessoaService: PessoaService) { }

    @Get()
    @ApiOperation({
        summary: 'Obter todas as pessoas cadastradas',
        description: 'Retorna uma lista com todas as pessoas cadastradas no sistema, incluindo seus detalhes.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna uma lista de todas as pessoas cadastradas.',
        type: ObterPessoaResponse,
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
    async obterPessoa(): Promise<ObterPessoaResponse[]> {
        return await this._pessoaService.obterPessoa();
    }

    @Get(':idPessoa')
    @ApiOperation({
        summary: 'Obter pessoa por ID',
        description: 'Retorna os detalhes de uma pessoa específica, identificada pelo ID fornecido.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna os detalhes de uma pessoa específica.',
        type: ObterPessoaResponse,
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: RegraDeNegocioException,
    })
    async obterPessoaId(
        @Param() parametros: ObterPessoaIdRequest
    ): Promise<ObterPessoaResponse> {
        return await this._pessoaService.obterPessoaId(parametros.idPessoa);
    }

    @Post()
    @ApiOperation({
        summary: 'Criar nova pessoa',
        description: 'Cria uma nova pessoa no sistema com as informações fornecidas.',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Pessoa criada com sucesso.',
        type: ObterPessoaResponse,
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: RegraDeNegocioException,
    })
    async criarPessoa(@Body() parametros: CriarPessoaRequest): Promise<ObterPessoaResponse> {
        return await this._pessoaService.criarPessoa(parametros);
    }

    @Delete(':idPessoa')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Deletar pessoa por ID',
        description: 'Deleta a pessoa identificada pelo ID fornecido do sistema.',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Pessoa deletada com sucesso.',
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
        @Param() parametros: ObterPessoaIdRequest
    ): Promise<void> {
        await this._pessoaService.desativarPessoaId(parametros.idPessoa);
    }

    @Put(':idPessoa')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Atualizar pessoa por ID',
        description: 'Atualiza os dados de uma pessoa existente, identificada pelo ID fornecido.',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Pessoa atualizada com sucesso.',
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
        @Param() parametros: ObterPessoaIdRequest,
        @Body() body: AtualizarPessoaRequest
    ): Promise<void> {
        await this._pessoaService.atualizarPessoa(parametros.idPessoa, body);
    }
}
