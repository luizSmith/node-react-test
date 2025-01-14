import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { ErroPersonalizadoException } from './erroPersonalizado.exception';

export class RegraDeNegocioException extends ErroPersonalizadoException {
  constructor(message: Array<unknown>, status: number) {
    super(message, status, 'Business Exception');
    this.error = 'Business Exception';
    this.message = message;
    this.statusCode = status;
  }
}
