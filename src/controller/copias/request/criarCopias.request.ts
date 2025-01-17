import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CriarCopiaRequest {
    @ApiProperty({
        description: 'Id de identificação do livro',
    })
    @IsNotEmpty()
    idLivro: number;

    @ApiProperty({
        description: 'Número de cópias desejado',
    })
    @IsNotEmpty()
    numeroCopias: number;
}