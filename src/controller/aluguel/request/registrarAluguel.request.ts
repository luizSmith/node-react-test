import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { isDateGreaterThanNow, isValidNotAfter } from "src/infraestructure/pipe/validation/validarDatas.pipe";

export class RegistrarAlugueRequest {
    @ApiProperty({
        description: 'Id de registro da Pessoa',
        required: true,
    })
    @IsNotEmpty()
    idPessoa: number;

    @ApiProperty({
        description: 'Id de registro da Cópia',
        required: true,
    })
    @IsNotEmpty()
    idCopia: number;

    @ApiProperty({
        description: 'Data de lançamento do livro, no formato ISO 8601',
        example: '2025-10-03'
    })
    @isDateGreaterThanNow()
    dataPrazo: Date;
}

export class FinalizarAlugueRequest {
    @ApiProperty({
        description: 'Data de lançamento do livro, no formato ISO 8601',
        required: false,
        example: '2025-10-03'
    })
    dataEntrega: Date;
}