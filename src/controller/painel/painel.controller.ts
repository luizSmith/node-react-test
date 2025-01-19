import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { PainelService } from "src/service/painel/painel.service";
import { ObterRankingLivrosMaisAlugadosAnoRequest } from "./request/obterRanking.reques";
import { ObterRankingLivrosMaisAlugadosAnoResponse } from "./response/obterRanking.response";

@Controller('painel')
@ApiTags('Painel')
export class PainelController {
    constructor(private readonly _painelService: PainelService) { }

    @Get('rankingLivrosMaisAlugadosAno/:ano')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterRankingLivrosMaisAlugadosAnoResponse
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
    async obterAluguelPessoaId(
        @Param() parametros: ObterRankingLivrosMaisAlugadosAnoRequest
    ): Promise<ObterRankingLivrosMaisAlugadosAnoResponse> {
        return await this._painelService.obterRankingLivrosMaisAlugadosAno(parametros.ano);
    }
}