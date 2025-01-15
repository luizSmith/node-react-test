import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ObterLivrosIdRequest {
  @ApiProperty({
    description: 'ID do livro',
  })
  @IsNotEmpty({ message: 'Parâmetro idLivro é obrigatório' })
  idLivro: number;
}
