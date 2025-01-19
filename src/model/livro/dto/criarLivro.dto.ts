export class CriarLivroDTO {
    nome: string;
    lancamento: Date;
    isbn: string;
    idAutor: number;
}

export class AtualizarLivroDTO {
    nome: string;
    lancamento: Date;
    ativo: boolean;
    isbn: string;
    idAutor: number;
}
