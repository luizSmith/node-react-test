import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ObterCopiaRequest {
    @ApiProperty({
        description: 'Id de identificação da cópia',
    })
    @IsNotEmpty()
    idCopia: number;
}