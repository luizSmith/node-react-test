import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ObterQuantidadeDisponiveisLivroIdDTO {
    @ApiProperty({
        description: 'Id de registro do Livro',
        required: true,
    })
    @IsNotEmpty()
    idLivro: number;
}