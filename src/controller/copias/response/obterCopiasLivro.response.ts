import { ApiProperty } from "@nestjs/swagger";

export class ObterCopiasLivroDAO {
    @ApiProperty({
        description: 'Id da cópia',
    })
    idCopia: number;

    @ApiProperty({
        description: 'Data de registro no estoque',
    })
    dtEstoque: Date;

    @ApiProperty({
        description: 'Id do livro',
    })
    idLivro: number;

    @ApiProperty({
        description: 'Nome do autor',
    })
    nomeLivro: string

    @ApiProperty({
        description: 'Cópia disponivel',
    })
    status: string;

}