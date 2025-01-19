import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { AutenticacaoRequest } from 'src/controller/auth/request/autenticacao.request';
import { AutenticacaoResponse } from 'src/controller/auth/request/autenticacao.response';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { AdministradorRepository } from 'src/repository/administrador/administrador.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly _administradorRepository: AdministradorRepository
  ) { }

  async autenticacao(
    parametros: AutenticacaoRequest
  ): Promise<AutenticacaoResponse> {
    const { email, senha } = parametros;
    const hash = this._gerarHashSenha(senha);

    const usuario = await this._administradorRepository.obterAdministrador({
      email,
      senha: hash,
    });

    if (!usuario) {
      throw new RegraDeNegocioException(['Usuário não existe'], 400);
    }

    return this._gerarJWT(email);
  }

  private _gerarHashSenha(senha: string): string {
    const salt = process.env.SALT;

    return crypto
      .createHash('md5')
      .update(senha + salt)
      .digest('hex');
  }

  private _gerarJWT(email: string): AutenticacaoResponse {
    const dataAtual = new Date();

    const JWT = jwt.sign({ email }, process.env.SALT, {
      expiresIn: '3h',
    });

    const resposta: AutenticacaoResponse = {
      tokenAcesso: JWT,
      tempoExpiracao: dataAtual.setHours(dataAtual.getHours() + 3).toString(),
    };

    return resposta;
  }
}
