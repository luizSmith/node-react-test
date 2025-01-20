import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CopiasService } from 'src/service/copias/copias.service';
import { CopiasRepository } from 'src/repository/copias/copias.repository';
import { LivrosService } from 'src/service/livros/livros.service';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { CriarCopiaRequest } from 'src/controller/copias/request/criarCopias.request';
import { CriarCopiaResponse } from 'src/controller/copias/response/criarCopias.response';
import { ObterCopiasLivroDAO } from 'src/model/copia/dao/obterCopiasLivro.dao';

describe('CopiasService', () => {
    let copiasService: CopiasService;
    let copiasRepository: CopiasRepository;
    let livrosService: LivrosService;

    beforeEach(() => {
        copiasRepository = {
            obterCopiasLivroId: vi.fn(),
            obterCopiasId: vi.fn(),
            criarCopia: vi.fn(),
            deletarCopiaId: vi.fn(),
        } as any;

        livrosService = {
            obterLivrosId: vi.fn(),
        } as any;

        copiasService = new CopiasService(copiasRepository, livrosService);
    });

    describe('obterCopiasLivrosId', () => {
        it('deve retornar copias de um livro com sucesso', async () => {
            const idLivro = 1;
            const mockCopias: ObterCopiasLivroDAO[] = [
                { idCopia: 1, dtEstoque: new Date(), idLivro, nomeLivro: 'Livro 1', status: 'ativo' },
                { idCopia: 2, dtEstoque: new Date(), idLivro, nomeLivro: 'Livro 1', status: 'ativo' },
            ];

            vi.spyOn(livrosService, 'obterLivrosId').mockResolvedValue(undefined);
            vi.spyOn(copiasRepository, 'obterCopiasLivroId').mockResolvedValue(mockCopias);

            const result = await copiasService.obterCopiasLivrosId(idLivro);

            expect(result).toEqual(mockCopias);
            expect(copiasRepository.obterCopiasLivroId).toHaveBeenCalledWith(idLivro);
        });

        it('deve lançar erro quando falhar ao obter copias', async () => {
            const idLivro = 1;

            vi.spyOn(livrosService, 'obterLivrosId').mockResolvedValue(undefined);
            vi.spyOn(copiasRepository, 'obterCopiasLivroId').mockRejectedValue(RegraDeNegocioException);

            await expect(copiasService.obterCopiasLivrosId(idLivro)).rejects.toThrowError(RegraDeNegocioException);
        });
    });

    describe('obterCopiaId', () => {
        it('deve retornar uma copia com sucesso', async () => {
            const idCopia = 1;
            const mockCopia: ObterCopiasLivroDAO = {
                idCopia,
                dtEstoque: new Date(),
                idLivro: 1,
                nomeLivro: 'Livro 1',
                status: 'ativo',
            };

            vi.spyOn(copiasRepository, 'obterCopiasId').mockResolvedValue(mockCopia);

            const result = await copiasService.obterCopiaId(idCopia);

            expect(result).toEqual(mockCopia);
            expect(copiasRepository.obterCopiasId).toHaveBeenCalledWith(idCopia);
        });

        it('deve lançar erro quando a copia não existir', async () => {
            const idCopia = 999;
            vi.spyOn(copiasRepository, 'obterCopiasId').mockResolvedValue(null);

            await expect(copiasService.obterCopiaId(idCopia)).rejects.toThrowError(RegraDeNegocioException);
        });
    });

    describe('criarCopias', () => {
        it('deve criar cópias com sucesso', async () => {
            const parametros: CriarCopiaRequest = {
                idLivro: 1,
                numeroCopias: 3,
            };

            vi.spyOn(livrosService, 'obterLivrosId').mockResolvedValue(undefined);
            vi.spyOn(copiasRepository, 'criarCopia').mockResolvedValue(undefined);

            const result: CriarCopiaResponse = await copiasService.criarCopias(parametros);

            expect(result.mensagem).toBe('Cópias criadas com sucesso!');
            expect(copiasRepository.criarCopia).toHaveBeenCalledWith([
                { dtEstoque: expect.any(Date), ativo: true, idLivro: parametros.idLivro },
                { dtEstoque: expect.any(Date), ativo: true, idLivro: parametros.idLivro },
                { dtEstoque: expect.any(Date), ativo: true, idLivro: parametros.idLivro },
            ]);
        });

        it('deve lançar erro quando falhar ao criar as cópias', async () => {
            const parametros: CriarCopiaRequest = {
                idLivro: 1,
                numeroCopias: 3,
            };

            vi.spyOn(copiasRepository, 'criarCopia').mockRejectedValue(new RegraDeNegocioException(['Erro ao criar cópias'], 400));
            await expect(copiasService.criarCopias(parametros)).rejects.toThrowError(
                RegraDeNegocioException
            );
        });
    });

    describe('desativarCopiaId', () => {
        it('deve desativar uma copia com sucesso', async () => {
            const idCopia = 1;

            const mockCopia: ObterCopiasLivroDAO = {
                idCopia,
                dtEstoque: new Date(),
                idLivro: 101,
                nomeLivro: 'Livro de Teste',
                status: 'ativo',
            };

            vi.spyOn(copiasRepository, 'obterCopiasId').mockResolvedValue(mockCopia);
            vi.spyOn(copiasRepository, 'deletarCopiaId').mockResolvedValue(undefined);

            await copiasService.desativarCopiaId(idCopia);

            expect(copiasRepository.deletarCopiaId).toHaveBeenCalledWith(idCopia);
        });

        it('deve lançar erro quando falhar ao desativar a copia', async () => {
            const idCopia = 1;

            const mockCopia: ObterCopiasLivroDAO = {
                idCopia,
                dtEstoque: new Date(),
                idLivro: 101,
                nomeLivro: 'Livro de Teste',
                status: 'ativo',
            };

            vi.spyOn(copiasRepository, 'obterCopiasId').mockResolvedValue(mockCopia);
            vi.spyOn(copiasRepository, 'deletarCopiaId').mockRejectedValue(RegraDeNegocioException);

            await expect(copiasService.desativarCopiaId(idCopia)).rejects.toThrowError(RegraDeNegocioException);
        });
    });

});
