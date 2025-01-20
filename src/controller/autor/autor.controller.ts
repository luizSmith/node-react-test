import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { AutorService } from "src/service/autor/autor.service";
import { ObterAutorResponse } from "./response/obterAutor.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";
import { CriarAutorRequest } from "./request/criarAutor.request";

@Controller('autores')
@ApiTags('Autor')
export class AutorController {
    constructor(private readonly _autorService: AutorService) { }

    @Get()
    @ApiOperation({
        summary: 'Obter todos os autores cadastrados',
        description: 'Retorna uma lista de todos os autores cadastrados no sistema. Este endpoint pode ser usado para consultar todos os autores e seus respectivos detalhes.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna a lista de autores cadastrados no sistema.',
        type: ObterAutorResponse,
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
    async obterAutor(): Promise<ObterAutorResponse[]> {
        return await this._autorService.obterAutor();
    }

    @Post()
    @ApiOperation({
        summary: 'Criar um novo autor',
        description: 'Cria um novo autor no sistema. Este endpoint recebe os dados necessários para criar um autor e retorna os detalhes do autor recém-criado.',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Autor criado com sucesso. Retorna os dados do autor recém-criado.',
        type: ObterAutorResponse,
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: RegraDeNegocioException,
    })
    async criarAutor(@Body() parametros: CriarAutorRequest): Promise<ObterAutorResponse> {
        return await this._autorService.criarAutor(parametros);
    }
}
