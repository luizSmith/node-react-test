export class CriarLivroDTO {
    nome: string;
    lancamento: Date;
    idAutor: number;
}

export class AtualizarLivroDTO {
    nome: string;
    lancamento: Date;
    ativo: boolean;
    idAutor: number;
}
