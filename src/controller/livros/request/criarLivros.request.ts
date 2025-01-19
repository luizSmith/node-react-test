import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsISBN, isISBN, IsNumber, IsString } from "class-validator";
import { isValidNotAfter } from "src/infraestructure/pipe/validation/validarDatas.pipe";

export class CriarLivroRequest {
    @ApiProperty({
        description: 'Nome do livro (título do livro)',
    })
    @IsString()
    nome: string;

    @ApiProperty({
        description: 'Data de lançamento do livro, no formato ISO 8601',
        example: '1911-10-03'
    })
    @IsDateString()
    @isValidNotAfter()
    lancamento: Date;

    @ApiProperty({
        description: 'Número de Registro da edição',
    })
    @IsISBN(null, {
        message: "Número de registro da edição é inválido"
    })
    isbn: string;

    @ApiProperty({
        description: 'ID do autor do livro (relacionado a um autor na base de dados)',
    })
    @IsNumber()
    idAutor: number;
}

export class AtualizarLivroRequest {
    @ApiProperty({
        description: 'Nome do livro (título do livro)',
    })
    @IsString()
    nome: string;

    @ApiProperty({
        description: 'Data de lançamento do livro, no formato ISO 8601',
        example: '1911-10-03'
    })
    @IsDateString()
    @isValidNotAfter()
    lancamento: Date;

    @ApiProperty({
        description: 'Indica se o livro está ativo (disponível) ou não',
    })
    ativo: boolean;

    @ApiProperty({
        description: 'Número de Registro da edição',
    })
    @IsISBN(null, {
        message: "Número de registro da edição é inválido"
    })
    isbn: string;

    @ApiProperty({
        description: 'ID do autor do livro (relacionado a um autor na base de dados)',
    })
    @IsNumber()
    idAutor: number;
}
