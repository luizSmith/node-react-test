export class RegistrarAluguelDAO {
    id: number;
    dtRetirada: Date;
    dtPrazo: Date;
    dtDevolucao: Date | null;
    idPessoa: number;
    idCopiaLivro: number;
}