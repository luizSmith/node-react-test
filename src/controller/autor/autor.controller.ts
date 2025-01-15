import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
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
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterAutorResponse,
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
    async obterAutor(): Promise<ObterAutorResponse[]> {
        return await this._autorService.obterAutor();
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Sucesso',
        type: ObterAutorResponse,
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
    async criarLivro(@Body() parametros: CriarAutorRequest): Promise<ObterAutorResponse> {
        return await this._autorService.criarAutor(parametros);
    }
}