import { ApiProperty } from "@nestjs/swagger";

export class CriarCopiaResponse {
    @ApiProperty({
        description: 'mensagem de retorno',
    })
    mensagem: string;
}