import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse, ApiTags, ApiOperation } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { PainelService } from "src/service/painel/painel.service";
import { ObterRankingLivrosMaisAlugadosAnoRequest } from "./request/obterRanking.reques";
import { ObterRankingLivrosAtrasoResponse, ObterRankingLivrosMaisAlugadosAnoResponse } from "./response/obterRanking.response";

@Controller('painel')
@ApiTags('Painel')
export class PainelController {
    constructor(private readonly _painelService: PainelService) { }

    @Get('rankingLivrosMaisAlugadosAno/:ano')
    @ApiOperation({
        summary: 'Obter ranking de livros mais alugados no ano',
        description: 'Retorna um ranking com os livros mais alugados durante o ano especificado. O ranking é ordenado pelo número de alugueis realizados.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna o ranking dos livros mais alugados no ano.',
        type: ObterRankingLivrosMaisAlugadosAnoResponse
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: RegraDeNegocioException,
    })
    async obterRankingLivrosMaisAlugadosAno(
        @Param() parametros: ObterRankingLivrosMaisAlugadosAnoRequest
    ): Promise<ObterRankingLivrosMaisAlugadosAnoResponse> {
        return await this._painelService.obterRankingLivrosMaisAlugadosAno(parametros.ano);
    }

    @Get('rankingLivrosMaisAtrasadosAno/:ano')
    @ApiOperation({
        summary: 'Obter ranking de livros mais atrasados no ano',
        description: 'Retorna um ranking dos livros mais atrasados durante o ano especificado, com base nos livros que mais ultrapassaram o prazo de devolução.',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Retorna o ranking dos livros mais atrasados no ano.',
        type: ObterRankingLivrosAtrasoResponse
    })
    @ApiResponse({
        status: HttpStatus.BAD_GATEWAY,
        type: ErroPersonalizadoException,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        type: RegraDeNegocioException,
    })
    async obterRankingLivrosMaisAtrasadosAno(
        @Param() parametros: ObterRankingLivrosMaisAlugadosAnoRequest
    ): Promise<ObterRankingLivrosAtrasoResponse> {
        return await this._painelService.obterRankingLivrosMaisAtrasadosAno(parametros.ano);
    }
}
