import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AutorService } from "src/service/autor/autor.service";
import { ObterAutorDTO } from "./response/obterAutor.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ErroPersonalizadoException } from "src/infraestructure/exceptions/erroPersonalizado.exception";

@Controller('autores')
@ApiTags('Autor')
export class AutorController {
    constructor(private readonly _autorService: AutorService) { }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Sucesso',
        type: ObterAutorDTO,
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
    async obterLivros(): Promise<ObterAutorDTO[]> {
        return await this._autorService.obterAutor();
    }
}