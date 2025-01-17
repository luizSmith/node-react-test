import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { RegraDeNegocioException } from '../exceptions/regraDeNegocio.exception';

@Injectable()
export class SegurancaMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): boolean {
    if (this.verificarJWT(req)) {
      next();
      return true;
    }

    return false;
  }

  verificarJWT(req: Request): boolean {
    const bearerToken = req.headers.authorization
      ? req.headers.authorization
      : '';

    if (!bearerToken || !bearerToken.includes('Bearer ')) {
      throw new RegraDeNegocioException(
        ['Token inválido. O token deve ser do tipo Bearer'],
        HttpStatus.UNAUTHORIZED
      );
    }

    const token = bearerToken.replace('Bearer ', '').trim();

    if (!process.env.SALT) {
      throw new Error('Variavel de ambiente "SALT" não definida');
    }

    jwt.verify(token, process.env.SALT, (error) => {
      if (error) {
        if (error.name && error.name === "TokenExpiredError") {
          throw new RegraDeNegocioException(['Token expirou'], HttpStatus.UNAUTHORIZED)
        }

        throw new RegraDeNegocioException(
          ['Token inválido'], HttpStatus.UNAUTHORIZED
        );
      }

    }) as jwt.JwtPayload;

    return true;
  }
}
