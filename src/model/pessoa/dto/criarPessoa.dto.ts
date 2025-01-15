export class CriarPessoaDTO {
    nome: string;
    cpf: string;
    dataNascimento: string;
    logradouro: string;
    numero: number;
    referencia: string;
    cidade: number;
}

export class AtualizarPessoaDTO {
    nome: string;
    cpf: string;
    logradouro: string;
    numero: number;
    referencia: string;
    cidade: number;
    ativo: boolean;
}

