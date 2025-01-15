import { Injectable } from "@nestjs/common";
import { ObterAutorDTO } from "src/controller/autor/response/obterAutor.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { AutorRepository } from "src/repository/autor/autor.repository";
import { Autor } from "src/repository/autor/entity/autor.entity";

@Injectable()
export class AutorService {
    constructor(private _autorRepository: AutorRepository) { }

    async obterAutorId(idAutor: number): Promise<Autor> {
        const autor = await this._autorRepository.obterAutorId(idAutor);

        if (!autor) {
            throw new RegraDeNegocioException(['Autor não existe'], 404);
        }

        return autor;
    }

    async obterAutor(): Promise<ObterAutorDTO[]> {
        return await this._autorRepository.obterAutor();
    }
}