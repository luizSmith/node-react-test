import { ApiProperty } from '@nestjs/swagger';

export class CriarPessoaRequest {
    @ApiProperty({
        description: 'Nome da Pessoa',
        example: 'João Silva',
    })
    nome: string;

    @ApiProperty({
        description: 'CPF da Pessoa',
        example: '12345678900',
    })
    cpf: string;

    @ApiProperty({
        description: 'Data de nascimento da Pessoa',
        example: '1985-01-01',
    })
    dataNascimento: string;

    @ApiProperty({
        description: 'Logradouro onde a Pessoa reside',
        example: 'Rua das Flores',
    })
    logradouro: string;

    @ApiProperty({
        description: 'Número do endereço onde a Pessoa reside',
        example: 100,
    })
    numero: number;

    @ApiProperty({
        description: 'Referência do endereço onde a Pessoa reside',
        example: 'Próximo ao supermercado',
    })
    referencia: string;

    @ApiProperty({
        description: 'CEP do endereço da Pessoa',
        example: '12345-678',
    })
    cep: string;
}

export class AtualizarPessoaRequest {
    @ApiProperty({
        description: 'Nome da Pessoa',
        example: 'João Silva',
    })
    nome: string;

    @ApiProperty({
        description: 'CPF da Pessoa',
        example: '12345678900',
    })
    cpf: string;

    @ApiProperty({
        description: 'Logradouro onde a Pessoa reside',
        example: 'Rua das Flores',
    })
    logradouro: string;

    @ApiProperty({
        description: 'Número do endereço onde a Pessoa reside',
        example: 100,
    })
    numero: number;

    @ApiProperty({
        description: 'Referência do endereço onde a Pessoa reside',
        example: 'Próximo ao supermercado',
    })
    referencia: string;

    @ApiProperty({
        description: 'Define se o registro é ativo',
        example: 'true',
    })
    ativo: boolean;

    @ApiProperty({
        description: 'CEP do endereço da Pessoa',
        example: '12345-678',
    })
    cep: string;
}
