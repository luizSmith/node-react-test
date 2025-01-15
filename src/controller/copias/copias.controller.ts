import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CopiasService } from "src/service/copias/copias.service";
import { ObterLivrosIdRequest } from "../livros/request/obterLivrosId.request";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ObterCopiasLivroDAO } from "./response/obterCopiasLivro.response";
import { CriarCopiaRequest } from "./request/criarCopias.request";
import { CriarCopiaResponse } from "./response/criarCopias.response";
import { ObterCopiaRequest } from "./request/obterCopias.request";

@Controller('livros')
@ApiTags('Livros')
export class CopiasController {
    constructor(private readonly _copiasService: CopiasService) { }

    @Get(':idLivro/copias')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterCopiasLivroDAO,
        isArray: true
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
    async obterCopiasLivrosId(
        @Param() parametros: ObterLivrosIdRequest
    ): Promise<ObterCopiasLivroDAO[]> {
        return await this._copiasService.obterCopiasLivrosId(parametros.idLivro);
    }

    @Post('copias')
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Sucesso',
        type: CriarCopiaResponse,
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
    async criarLivro(@Body() parametros: CriarCopiaRequest): Promise<CriarCopiaResponse> {
        return await this._copiasService.criarCopias(parametros);
    }

    @Delete('copias/:idCopia')
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
        @Param() parametros: ObterCopiaRequest
    ): Promise<void> {
        await this._copiasService.desativarCopiaId(parametros.idCopia);
    }
}