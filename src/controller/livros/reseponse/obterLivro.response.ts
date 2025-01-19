import { ApiProperty } from '@nestjs/swagger';

export class ObterLivroResponse {
  @ApiProperty({
    description: 'ID do livro',
  })
  id: number;

  @ApiProperty({
    description: 'Nome do livro',
  })
  nomeLivro: string;

  @ApiProperty({
    description: 'Data lançamento do livro',
  })
  lancamento: Date;

  @ApiProperty({
    description: 'Número de Registro da edição',
  })
  isbn: string;

  @ApiProperty({
    description: 'Nome autor do livro',
  })
  nomeAutor: string;
}
