import { ApiProperty } from "@nestjs/swagger";

export class ObterAutorResponse {
    @ApiProperty({
        description: 'Id do autor',
    })
    id: number;

    @ApiProperty({
        description: 'Nome do autor',
    })
    nome: string;
}