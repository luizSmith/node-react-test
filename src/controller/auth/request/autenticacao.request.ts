import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AutenticacaoRequest {
  @ApiProperty({
    description: 'Nome de usuário',
    required: true,
  })
  @IsNotEmpty({
    message: 'email obrigatório',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha',
    required: true,
  })
  @IsNotEmpty({
    message: 'Senha obrigatória',
  })
  senha: string;
}
