import { Injectable } from "@nestjs/common";
import { CriarAutorRequest } from "src/controller/autor/request/criarAutor.request";
import { ObterAutorResponse } from "src/controller/autor/response/obterAutor.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { AutorRepository } from "src/repository/autor/autor.repository";
import { Autor } from "src/repository/autor/entity/autor.entity";

@Injectable()
export class AutorService {
    constructor(private _autorRepository: AutorRepository) { }

    async obterAutorId(idAutor: number): Promise<ObterAutorResponse> {
        const autor = await this._autorRepository.obterAutorId(idAutor);

        if (!autor) {
            throw new RegraDeNegocioException(['Autor não existe'], 404);
        }

        return autor;
    }

    async obterAutor(): Promise<ObterAutorResponse[]> {
        return await this._autorRepository.obterAutor();
    }

    async criarAutor(parametros: CriarAutorRequest): Promise<ObterAutorResponse> {
        try {
            return await this._autorRepository.criarAutor(parametros);
        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro ao cadastrar autor"], 400
            );
        }

    }
}