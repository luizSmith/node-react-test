import { ApiProperty } from "@nestjs/swagger";

export class ObterAutorDTO {
    @ApiProperty({
        description: 'Id do autor',
    })
    id: number;

    @ApiProperty({
        description: 'Nome do autor',
    })
    nome: string;
}