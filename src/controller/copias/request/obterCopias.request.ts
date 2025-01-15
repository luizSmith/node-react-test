import { ApiProperty } from "@nestjs/swagger";

export class ObterCopiaRequest {
    @ApiProperty({
        description: 'Id de identificação da cópia',
    })
    idCopia: number;
}