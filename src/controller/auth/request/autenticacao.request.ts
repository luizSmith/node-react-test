import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AutenticacaoRequest {
  @ApiProperty({
    description: 'Nome de usuário',
    required: true,
  })
  @IsNotEmpty({
    message: 'Login obrigatório',
  })
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
