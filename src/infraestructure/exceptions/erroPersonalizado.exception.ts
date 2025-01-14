import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export class ErroPersonalizadoException extends HttpException {
  @ApiProperty({
    description: 'HTTP Status Code',
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    description: 'Error description array',
    type: [String],
  })
  @IsArray()
  message;

  @ApiProperty({
    description: 'HTTP status code name',
    type: String,
  })
  @IsString()
  error: string;

  @ApiProperty({
    description: 'Timestamp',
  })
  @IsString()
  timeStamp: string;

  constructor(
    message: Array<unknown> | string,
    statusCode: number,
    error?: string
  ) {
    if (!statusCode) {
      statusCode = 502;
      message =
        'Ocorreu um erro inesperado, entre em contato com o time de suporte';
    }
    super(
      {
        statusCode,
        message: message,
        error: error || HttpErrorByCode[statusCode].name,
      },
      statusCode
    );
    this.statusCode = statusCode;
  }
}
