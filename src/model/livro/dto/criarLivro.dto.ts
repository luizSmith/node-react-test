export class CriarLivroDTO {
    nome: string;
    lancamento: string;
    idAutor: number;
}

export class AtualizarLivroDTO {
    nome: string;
    lancamento: string;
    ativo: boolean;
    idAutor: number;
}
