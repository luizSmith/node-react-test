import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { AluguelService } from "src/service/aluguel/aluguel.service";
import { RegistrarAlugueRequest } from "./request/registrarAluguel.request";
import { ObterAluguelRequest, ObterQuantidadeDisponiveisLivroIdDTO } from "./request/obterAluguel.request";
import { ObterAluguelExistenteCopiaIdDAO, ObterCopiasDisponiveisResponse } from "./response/obterAluguel.response";
import { RegistrarAluguelResponse } from "./response/registrarAluguel.response";

@Controller('aluguel')
@ApiTags('Aluguel')
export class AluguelController {
    constructor(private readonly _aluguelService: AluguelService) { }

    @Get('pessoa/:idPessoa')
    @ApiOperation({
        summary: 'Obter aluguéis de um usuário específico',
        description: 'Retorna todos os aluguéis do usuário especificado. Pode ser usado para obter o histórico de aluguéis de um usuário com base no seu ID.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna todos os aluguéis do usuário especificado.',
        type: ObterAluguelExistenteCopiaIdDAO,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Nenhum aluguel encontrado para o idPessoa fornecido.',
        type: RegraDeNegocioException,
    })
    async obterAluguelPessoaId(
        @Param() parametros: ObterQuantidadeDisponiveisLivroIdDTO
    ): Promise<ObterAluguelExistenteCopiaIdDAO[]> {
        return await this._aluguelService.obterAluguelPessoaId(parametros.idLivro);
    }

    @Get('livros/:idLivro')
    @ApiOperation({
        summary: 'Obter quantidade de cópias disponíveis de um livro',
        description: 'Retorna a quantidade de cópias disponíveis de um livro específico para aluguel. Usado para consultar a disponibilidade de cópias de um livro.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna a quantidade de cópias disponíveis do livro especificado.',
        type: ObterCopiasDisponiveisResponse,
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Nenhuma cópia disponível encontrada para o idLivro fornecido.',
        type: RegraDeNegocioException,
    })
    async obterQuantidadeDisponiveisLivroId(
        @Param() parametros: ObterQuantidadeDisponiveisLivroIdDTO
    ): Promise<ObterCopiasDisponiveisResponse> {
        return await this._aluguelService.obterQuantidadeDisponiveisLivroId(parametros.idLivro);
    }

    @Post()
    @ApiOperation({
        summary: 'Registrar um novo aluguel',
        description: 'Registra um novo aluguel no sistema, associando um livro a um usuário. Retorna os dados do aluguel recém-registrado.',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Aluguel registrado com sucesso.',
        type: RegistrarAluguelResponse,
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Dados inválidos ou livro não encontrado.',
        type: RegraDeNegocioException,
    })
    async registrarAluguel(@Body() parametros: RegistrarAlugueRequest): Promise<RegistrarAluguelResponse> {
        return await this._aluguelService.registrarAluguel(parametros);
    }

    @Delete(':idAluguel')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Finalizar um aluguel',
        description: 'Finaliza um aluguel existente no sistema com base no ID fornecido. Este endpoint é utilizado para finalizar ou remover um aluguel registrado.',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Aluguel Finalizado com sucesso.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Aluguel não encontrado para o idAluguel fornecido.',
        type: RegraDeNegocioException,
    })
    async deletarPessoaId(
        @Param() parametros: ObterAluguelRequest
    ): Promise<void> {
        await this._aluguelService.finalizarAluguel(parametros.idAluguel);
    }
}
