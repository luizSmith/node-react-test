import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CriarAutorRequest {
    @ApiProperty({
        description: 'Nome do autor',
    })
    @IsNotEmpty()
    nome: string;
}