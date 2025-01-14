import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/service/auth/auth.service';
import { AutenticacaoRequest } from './request/autenticacao.request';
import { AutenticacaoResponse } from './request/autenticacao.response';

@Controller('autenticar')
@ApiTags('Autenticar')
export class AuthController {
  constructor(private readonly _authService: AuthService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Sucesso',
    type: AutenticacaoResponse,
  })
  async autenticacao(
    @Body() parametros: AutenticacaoRequest
  ): Promise<AutenticacaoResponse> {
    return await this._authService.autenticacao(parametros);
  }
}
