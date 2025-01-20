import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { isValidNotAfter } from 'src/infraestructure/pipe/validation/validarDatas.pipe';

export class CriarPessoaRequest {
    @ApiProperty({
        description: 'Nome da Pessoa',
        example: 'João Silva',
    })
    @IsString()
    nome: string;

    @ApiProperty({
        description: 'CPF da Pessoa',
        example: '12345678900',
    })
    @IsString()
    cpf: string;

    @ApiProperty({
        description: 'Data de nascimento da Pessoa',
        example: '1985-01-01',
    })
    @isValidNotAfter()
    dataNascimento: string;

    @ApiProperty({
        description: 'Logradouro onde a Pessoa reside',
        example: 'Rua das Flores',
    })
    @IsString()
    logradouro: string;

    @ApiProperty({
        description: 'Número do endereço onde a Pessoa reside',
        example: 100,
    })
    @IsNumber()
    numero: number;

    @ApiProperty({
        description: 'Referência do endereço onde a Pessoa reside',
        example: 'Próximo ao supermercado',
    })
    @IsString()
    referencia: string;

    @ApiProperty({
        description: 'CEP do endereço da Pessoa',
        example: '12345678',
    })
    @IsString()
    cep: string;
}

export class AtualizarPessoaRequest {
    @ApiProperty({
        description: 'Nome da Pessoa',
        example: 'João Silva',
    })
    @IsNotEmpty()
    @IsString()
    nome: string;

    @ApiProperty({
        description: 'CPF da Pessoa',
        example: '12345678900',
    })
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @ApiProperty({
        description: 'Logradouro onde a Pessoa reside',
        example: 'Rua das Flores',
    })
    @IsNotEmpty()
    @IsString()
    logradouro: string;

    @ApiProperty({
        description: 'Número do endereço onde a Pessoa reside',
        example: 100,
    })
    @IsNumber()
    numero: number;

    @ApiProperty({
        description: 'Referência do endereço onde a Pessoa reside',
        example: 'Próximo ao supermercado',
    })
    @IsString()
    @IsNotEmpty()
    referencia: string;

    @ApiProperty({
        description: 'Define se o registro é ativo',
        example: 'true',
    })
    @IsBoolean()
    ativo: boolean;

    @ApiProperty({
        description: 'CEP do endereço da Pessoa',
        example: '12345678',
    })
    @IsNotEmpty()
    cep: string;
}
