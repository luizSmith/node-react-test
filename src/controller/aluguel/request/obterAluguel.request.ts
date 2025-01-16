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

export class ObterAluguelRequest {
    @ApiProperty({
        description: 'Id de registro da Cópia',
        required: true,
    })
    @IsNotEmpty()
    idAluguel: number;
}