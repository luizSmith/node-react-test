import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ObterRankingLivrosMaisAlugadosAnoRequest {
    @ApiProperty({
        description: 'Ano desejado',
        required: true,
    })
    @IsNotEmpty()
    ano: number;
}