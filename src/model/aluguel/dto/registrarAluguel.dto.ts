export class RegistrarAluguelDTO {
    dtRetirada: Date;
    idPessoa: number;
    idCopiaLivro: number;
    dtPrazo: Date;
}

export class AtualizarAluguelDTO {
    dtDevolucao: Date;
}