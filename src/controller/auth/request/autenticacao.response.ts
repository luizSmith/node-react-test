import { ApiProperty } from '@nestjs/swagger';

export class AutenticacaoResponse {
  @ApiProperty()
  tempoExpiracao: string;

  @ApiProperty()
  tokenAcesso: string;
}
