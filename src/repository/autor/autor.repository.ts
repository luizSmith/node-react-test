import { Injectable } from "@nestjs/common";
import { Autor } from "./entity/autor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AtualizarAutorDTO, CriarAutorDTO } from "src/model/autor/dto/criarAutor.dto";

@Injectable()
export class AutorRepository {
    constructor(
        @InjectRepository(Autor)
        private readonly _autorRepository: Repository<Autor>
    ) { }

    async obterAutor(): Promise<Autor[]> {
        const autor = await this._autorRepository
            .createQueryBuilder('autor')
            .select([
                'autor.cd_autor id',
                'autor.nm_autor nomeAutor',
            ])
            .getRawMany<Autor>();

        return autor;
    }

    async obterAutorId(idAutor: number): Promise<Autor> {
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

    async criarAutor(parametros: CriarAutorDTO): Promise<Autor> {
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