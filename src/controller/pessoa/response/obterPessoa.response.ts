import { ApiProperty } from '@nestjs/swagger';

export class ObterPessoaResponse {
    @ApiProperty({
        description: 'Id da Pessoa',
    })
    id: number;


    @ApiProperty({
        description: 'Nome da Pessoa',
    })
    nome: string;

    @ApiProperty({
        description: 'CPF da Pessoa',
    })
    cpf: string;

    @ApiProperty({
        description: 'Data de nascimento da Pessoa',
    })
    dataNascimento: string;

    @ApiProperty({
        description: 'Logradouro onde a Pessoa reside',
    })
    logradouro: string;

    @ApiProperty({
        description: 'Número do endereço onde a Pessoa reside',
    })
    numero: number;

    @ApiProperty({
        description: 'Referência do endereço onde a Pessoa reside',
    })
    referencia: string;

    @ApiProperty({
        description: 'Nome da cidade onde a Pessoa reside',
    })
    cidade: string;

    @ApiProperty({
        description: 'Sigla do estado onde a Pessoa reside',
    })
    estado: string;

    @ApiProperty({
        description: 'Indica se a Pessoa está ativa ou não',
        default: true,
    })
    ativo: boolean;
}
