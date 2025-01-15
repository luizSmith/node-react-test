import { Injectable } from "@nestjs/common";
import { LivrosService } from "../livros/livros.service";
import { CopiasRepository } from "src/repository/copias/copias.repository";
import { ObterCopiasLivroDAO } from "src/model/copia/dao/obterCopiasLivro.dao";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { CriarCopiaRequest } from "src/controller/copias/request/criarCopias.request";
import { CriarCopiaDTO } from "src/model/copia/dto/criarCopias.dto";
import { CriarCopiaResponse } from "src/controller/copias/response/criarCopias.response";

@Injectable()
export class CopiasService {
    constructor(
        private _copiasRepository: CopiasRepository,
        private _livrosService: LivrosService,
    ) { }

    async obterCopiasLivrosId(idLivro: number): Promise<ObterCopiasLivroDAO[]> {
        await this._livrosService.obterLivrosId(idLivro);

        try {
            return await this._copiasRepository.obterCopiasLivroId(idLivro);
        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao obter copias"], 400
            );
        }
    }

    async obterCopiaId(idCopia: number): Promise<ObterCopiasLivroDAO> {
        const copia = await this._copiasRepository.obterCopiasId(idCopia);

        if (!copia) {
            throw new RegraDeNegocioException(
                ["Erro ao obter copiaa"], 404
            );
        }

        return copia;
    }

    async criarCopias(parametros: CriarCopiaRequest): Promise<CriarCopiaResponse> {
        await this._livrosService.obterLivrosId(parametros.idLivro);

        const copias: CriarCopiaDTO[] = [];

        for (let index = 0; index < parametros.numeroCopias; index++) {
            copias.push({
                dtEstoque: new Date(),
                ativo: true,
                idLivro: parametros.idLivro,
            })
        }

        await this._copiasRepository.criarCopia(copias);

        return {
            mensagem: "Cópias criadas com sucesso!",
        }
    }

    async desativarCopiaId(idCopia: number): Promise<void> {
        await this.obterCopiaId(idCopia);

        try {
            await this._copiasRepository.deletarCopiaId(idCopia);
        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao desativar copias"], 400
            );
        }
    }
}

