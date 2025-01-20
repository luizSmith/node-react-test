import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { CopiasService } from "src/service/copias/copias.service";
import { ObterLivrosIdRequest } from "../livros/request/obterLivrosId.request";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ObterCopiasLivroDAO } from "./response/obterCopiasLivro.response";
import { CriarCopiaRequest } from "./request/criarCopias.request";
import { CriarCopiaResponse } from "./response/criarCopias.response";
import { ObterCopiaRequest } from "./request/obterCopias.request";

@Controller('livros')
@ApiTags('Copias')
export class CopiasController {
    constructor(private readonly _copiasService: CopiasService) { }

    @Get(':idLivro/copias')
    @ApiOperation({
        summary: 'Obter cópias de um livro',
        description: 'Este endpoint retorna todas as cópias disponíveis para o livro especificado pelo idLivro.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna a lista de cópias do livro.',
        type: ObterCopiasLivroDAO,
        isArray: true
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: RegraDeNegocioException,
    })
    async obterCopiasLivrosId(
        @Param() parametros: ObterLivrosIdRequest
    ): Promise<ObterCopiasLivroDAO[]> {
        return await this._copiasService.obterCopiasLivrosId(parametros.idLivro);
    }

    @Post('copias')
    @ApiOperation({
        summary: 'Criar nova cópia de livro',
        description: 'Este endpoint permite criar uma nova cópia de um livro no sistema.',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Cópia criada com sucesso.',
        type: CriarCopiaResponse,
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: RegraDeNegocioException,
    })
    async criarLivro(@Body() parametros: CriarCopiaRequest): Promise<CriarCopiaResponse> {
        return await this._copiasService.criarCopias(parametros);
    }

    @Delete('copias/:idCopia')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Desativar cópia de livro',
        description: 'Este endpoint permite desativar uma cópia de livro pelo seu idCopia.',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Cópia desativada com sucesso.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        description: 'Erro na comunicação com o servidor.',
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Cópia não encontrada para o idCopia fornecido.',
        type: RegraDeNegocioException,
    })
    async deletarPessoaId(
        @Param() parametros: ObterCopiaRequest
    ): Promise<void> {
        await this._copiasService.desativarCopiaId(parametros.idCopia);
    }
}
