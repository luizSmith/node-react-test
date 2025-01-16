import { Body, Controller, Get, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { AluguelService } from "src/service/aluguel/aluguel.service";
import { RegistrarAlugueRequest } from "./request/registrarAluguel.request";
import { ObterQuantidadeDisponiveisLivroIdDTO } from "./request/obterAluguel.request";
import { ObterAluguelExistenteCopiaIdResponse, ObterCopiasDisponiveisResponse } from "./response/obterAluguel.response";
import { RegistrarAluguelResponse } from "./response/registrarAluguel.response";

@Controller('aluguel')
@ApiTags('Aluguel')
export class AluguelController {
    constructor(private readonly _aluguelService: AluguelService) { }

    @Get('')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterCopiasDisponiveisResponse,
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
    async obterQuantidadeDisponiveisLivroId(
        @Param() parametros: ObterQuantidadeDisponiveisLivroIdDTO
    ): Promise<ObterCopiasDisponiveisResponse> {
        return await this._aluguelService.obterQuantidadeDisponiveisLivroId(parametros.idLivro);
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Sucesso',
        type: RegistrarAluguelResponse,
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
    async registrarAluguel(@Body() parametros: RegistrarAlugueRequest): Promise<RegistrarAluguelResponse> {
        return await this._aluguelService.registrarAluguel(parametros);
    }
}