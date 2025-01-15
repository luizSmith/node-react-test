import { ApiProperty } from "@nestjs/swagger";

export class CriarCopiaRequest {
    @ApiProperty({
        description: 'Id de identificação do livro',
    })
    idLivro: number;

    @ApiProperty({
        description: 'Número de cópias desejado',
    })
    numeroCopias: number;
}