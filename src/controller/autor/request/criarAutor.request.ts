import { ApiProperty } from "@nestjs/swagger";

export class CriarAutorRequest {
    @ApiProperty({
        description: 'Nome do autor',
    })
    nome: string;
}