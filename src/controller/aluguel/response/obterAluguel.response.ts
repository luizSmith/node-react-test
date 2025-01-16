import { ApiProperty } from "@nestjs/swagger";

export class ObterCopiasDisponiveisResponse {
    @ApiProperty({
        description: 'Id de registro do Livro',
    })
    id: number;

    @ApiProperty({
        description: 'Nome de registro do Livro',
    })
    nomeLivro: string;

    @ApiProperty({
        description: 'Numero de quantidades disponiveis',
    })
    quantidadeDisponivel: number;
}

export class ObterAluguelExistenteCopiaIdResponse {

    @ApiProperty({
        description: 'Id de registro do Aluguel',
    })
    id: number;

    @ApiProperty({
        description: 'Nome de registro do Livro',
    })
    nomeLivro: string;

    @ApiProperty({
        description: 'Id de registro da Cópia',
    })
    idCopia: number;
}