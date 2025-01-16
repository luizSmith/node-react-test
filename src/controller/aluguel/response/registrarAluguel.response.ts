import { ApiProperty } from "@nestjs/swagger";

export class RegistrarAluguelResponse {
    @ApiProperty({
        description: 'ID único do aluguel',
    })
    id: number;

    @ApiProperty({
        description: 'Data e hora em que o livro foi retirado',
    })
    dtRetirada: Date;

    @ApiProperty({
        description: 'Data de vencimento para a devolução do livro',
    })
    dtPrazo: Date;

    @ApiProperty({
        description: 'Data e hora em que o livro foi devolvido. Pode ser nulo se o livro ainda não foi devolvido',
    })
    dtDevolucao: Date | null;

    @ApiProperty({
        description: 'ID da pessoa que realizou o aluguel',
    })
    idPessoa: number;

    @ApiProperty({
        description: 'ID da cópia do livro que foi alugada',
    })
    idCopiaLivro: number;
}
