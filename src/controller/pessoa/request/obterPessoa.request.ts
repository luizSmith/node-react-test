import { ApiProperty } from '@nestjs/swagger';

export class ObterPessoaIdRequest {
    @ApiProperty({
        description: 'Id da Pessoa',
        example: '42',
    })
    idPessoa: number;
}