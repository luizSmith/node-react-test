import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from 'src/service/auth/auth.service';
import { AutenticacaoRequest } from './request/autenticacao.request';
import { AutenticacaoResponse } from './request/autenticacao.response';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exception';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';

@Controller('autenticar')
@ApiTags('Autenticar')
export class AuthController {
  constructor(private readonly _authService: AuthService) { }

  @Post()
  @ApiOperation({
    summary: 'Autenticar usuário',
    description: 'Este endpoint permite a autenticação de um usuário, fornecendo um token JWT válido por 3 horas. O token é necessário para acessar outras rotas protegidas no sistema.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Autenticação realizada com sucesso. Retorna um token JWT válido por 3 horas.',
    type: AutenticacaoResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    type: ErroPersonalizadoException,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: RegraDeNegocioException,
  })
  async autenticacao(
    @Body() parametros: AutenticacaoRequest
  ): Promise<AutenticacaoResponse> {
    return await this._authService.autenticacao(parametros);
  }
}
