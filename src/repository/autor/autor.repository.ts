import { Injectable } from "@nestjs/common";
import { Autor } from "./entity/autor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AtualizarAutorDTO, CriarAutorDTO } from "src/model/autor/dto/criarAutor.dto";
import { ObterAutorDAO } from "src/model/autor/dao/obterAutor.dao";

@Injectable()
export class AutorRepository {
    constructor(
        @InjectRepository(Autor)
        private readonly _autorRepository: Repository<Autor>
    ) { }

    async obterAutor(): Promise<ObterAutorDAO[]> {
        const autor = await this._autorRepository
            .createQueryBuilder('autor')
            .select([
                'autor.cd_autor id',
                'autor.nm_autor nome',
            ])
            .getRawMany<ObterAutorDAO>();

        return autor;
    }

    async obterAutorId(idAutor: number): Promise<ObterAutorDAO> {
        const autor = await this._autorRepository
            .createQueryBuilder('autor')
            .select([
                'autor.cd_autor id',
                'autor.nm_autor nome',
            ])
            .where('autor.cd_autor = :idAutor', { idAutor })
            .getRawOne()

        return autor;
    }

    async criarAutor(parametros: CriarAutorDTO): Promise<ObterAutorDAO> {
        return await this._autorRepository.create({
            ...parametros,
        }).save();
    }

    async atualizarAutor(idAutor: number, parametros: AtualizarAutorDTO): Promise<number> {
        const livro = await this._autorRepository.update(
            {
                id: idAutor
            },
            {
                ...parametros
            }
        );

        return livro.affected || 0;
    }
}