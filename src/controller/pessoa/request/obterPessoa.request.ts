import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ObterPessoaIdRequest {
    @ApiProperty({
        description: 'Id da Pessoa',
        example: '42',
    })
    @IsNotEmpty()
    idPessoa: number;
}