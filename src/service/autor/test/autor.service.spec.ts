import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AutorService } from '../autor.service';
import { AutorRepository } from 'src/repository/autor/autor.repository';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { CriarAutorRequest } from 'src/controller/autor/request/criarAutor.request';
import { ObterAutorResponse } from 'src/controller/autor/response/obterAutor.response';

describe('AutorService', () => {
    let autorService: AutorService;
    let autorRepository: AutorRepository;

    beforeEach(() => {
        autorRepository = {
            obterAutorId: vi.fn(),
            obterAutor: vi.fn(),
            criarAutor: vi.fn(),
        } as any;

        autorService = new AutorService(autorRepository);
    });

    describe('obterAutorId', () => {
        it('deve retornar um autor quando o id for válido', async () => {
            const idAutor = 1;
            const mockAutor: ObterAutorResponse = {
                id: idAutor,
                nome: 'Autor Teste',
            };

            vi.spyOn(autorRepository, 'obterAutorId').mockResolvedValue(mockAutor);

            const result = await autorService.obterAutorId(idAutor);

            expect(result).toEqual(mockAutor);
        });

        it('deve lançar erro se o autor não existir', async () => {
            const idAutor = 1;

            vi.spyOn(autorRepository, 'obterAutorId').mockResolvedValue(null);

            await expect(autorService.obterAutorId(idAutor)).rejects.toThrowError(
                RegraDeNegocioException
            );
        });
    });

    describe('obterAutor', () => {
        it('deve retornar uma lista de autores', async () => {
            const mockAutores: ObterAutorResponse[] = [
                { id: 1, nome: 'Autor 1' },
                { id: 2, nome: 'Autor 2' },
            ];

            vi.spyOn(autorRepository, 'obterAutor').mockResolvedValue(mockAutores);

            const result = await autorService.obterAutor();

            expect(result).toEqual(mockAutores);
        });
    });

    describe('criarAutor', () => {
        it('deve criar um autor com sucesso', async () => {
            const parametros: CriarAutorRequest = {
                nome: 'Autor Teste',
            };

            const mockAutor: ObterAutorResponse = {
                id: 1,
                nome: parametros.nome,
            };

            vi.spyOn(autorRepository, 'criarAutor').mockResolvedValue(mockAutor);

            const result = await autorService.criarAutor(parametros);

            expect(autorRepository.criarAutor).toHaveBeenCalledWith(parametros);
            expect(result).toEqual(mockAutor);
        });

        it('deve lançar erro se falhar ao criar o autor', async () => {
            const parametros: CriarAutorRequest = {
                nome: 'Autor Teste',
            };

            vi.spyOn(autorRepository, 'criarAutor').mockRejectedValue(new RegraDeNegocioException(['Erro ao cadastrar autor'], 400));

            await expect(autorService.criarAutor(parametros)).rejects.toThrowError(
                RegraDeNegocioException
            );
        });
    });
});
