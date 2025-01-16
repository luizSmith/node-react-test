import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CriarLivroRequest {
    @ApiProperty({
        description: 'Nome do livro (título do livro)',
    })
    @IsString()
    nome: string;

    @ApiProperty({
        description: 'Data de lançamento do livro, no formato ISO 8601',
    })
    @IsDateString()
    lancamento: Date;

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
    })
    @IsDateString()
    lancamento: Date;

    @ApiProperty({
        description: 'Indica se o livro está ativo (disponível) ou não',
    })
    ativo: boolean;

    @ApiProperty({
        description: 'ID do autor do livro (relacionado a um autor na base de dados)',
    })
    @IsNumber()
    idAutor: number;
}
