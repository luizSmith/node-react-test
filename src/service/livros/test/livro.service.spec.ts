import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LivrosService } from '../livros.service';
import { LivrosRepository } from 'src/repository/livros/livros.repository';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { CriarLivroRequest, AtualizarLivroRequest } from 'src/controller/livros/request/criarLivros.request';
import { ObterLivroResponse } from 'src/controller/livros/reseponse/obterLivro.response';
import { ObterAutorResponse } from 'src/controller/autor/response/obterAutor.response';
import { AutorService } from 'src/service/autor/autor.service';
import { CriarLivrosDAO } from 'src/model/livro/dao/criarLivro.dao';

describe('LivrosService', () => {
    let livrosService: LivrosService;
    let livrosRepository: LivrosRepository;
    let autorService: AutorService;

    beforeEach(() => {
        livrosRepository = {
            obterLivros: vi.fn(),
            obterLivrosId: vi.fn(),
            criarLivro: vi.fn(),
            atualizarLivro: vi.fn(),
            deletarLivroId: vi.fn(),
        } as unknown as LivrosRepository;

        autorService = {
            obterAutorId: vi.fn(),
        } as unknown as AutorService;

        livrosService = new LivrosService(livrosRepository, autorService);
    });

    describe('obterLivros', () => {
        it('deve retornar uma lista de livros', async () => {
            const mockLivros: ObterLivroResponse[] = [
                { id: 1, nomeLivro: 'Livro 1', isbn: '123456', lancamento: new Date('2024-01-01'), nomeAutor: 'Autor 1' },
                { id: 2, nomeLivro: 'Livro 2', isbn: '789101', lancamento: new Date('2024-01-01'), nomeAutor: 'Autor 2' },
            ];

            vi.spyOn(livrosRepository, 'obterLivros').mockResolvedValue(mockLivros);

            const result = await livrosService.obterLivros();

            expect(result).toEqual(mockLivros);
        });
    });

    describe('obterLivrosId', () => {
        it('deve retornar um livro quando passado um ID válido', async () => {
            const mockLivro: ObterLivroResponse = {
                id: 1,
                nomeLivro: 'Livro 1',
                isbn: '123456',
                lancamento: new Date('2024-01-01'),
                nomeAutor: 'Autor 1',
            };

            vi.spyOn(livrosRepository, 'obterLivrosId').mockResolvedValue(mockLivro);

            const result = await livrosService.obterLivrosId(1);

            expect(result).toEqual(mockLivro);
        });

        it('deve lançar um erro quando o livro não existe', async () => {
            vi.spyOn(livrosRepository, 'obterLivrosId').mockResolvedValue(null);

            await expect(livrosService.obterLivrosId(1)).rejects.toThrow(RegraDeNegocioException);
        });
    });

    describe('criarLivro', () => {
        it('deve criar um livro com sucesso', async () => {
            const parametros: CriarLivroRequest = {
                nome: 'Novo Livro',
                isbn: '123456789',
                lancamento: new Date('2025-01-01'),
                idAutor: 1,
            };

            const mockAutor: ObterAutorResponse = { id: 1, nome: 'Autor Teste' };
            const mockLivro: CriarLivrosDAO = { id: 1, ativo: true, ...parametros };

            vi.spyOn(autorService, 'obterAutorId').mockResolvedValue(mockAutor);
            vi.spyOn(livrosRepository, 'criarLivro').mockResolvedValue(mockLivro);

            const result = await livrosService.criarLivro(parametros);

            expect(result).toEqual({
                id: 1,
                nomeLivro: 'Novo Livro',
                isbn: '123456789',
                lancamento: new Date('2025-01-01'),
                nomeAutor: 'Autor Teste',
            });
        });

        it('deve lançar um erro se não conseguir criar o livro', async () => {
            const parametros: CriarLivroRequest = {
                nome: 'Novo Livro',
                isbn: '123456789',
                lancamento: new Date('2025-01-01'),
                idAutor: 1,
            };

            vi.spyOn(autorService, 'obterAutorId').mockResolvedValue(null);

            await expect(livrosService.criarLivro(parametros)).rejects.toThrow(RegraDeNegocioException);
        });
    });

    describe('atualizarLivro', () => {
        it('deve atualizar um livro com sucesso', async () => {
            const parametros: AtualizarLivroRequest = {
                nome: 'Livro Atualizado',
                isbn: '987654321',
                lancamento: new Date('2025-06-01'),
                idAutor: 1,
                ativo: true,
            };

            vi.spyOn(livrosRepository, 'obterLivrosId').mockResolvedValue({
                id: 1,
                nomeLivro: 'Livro 1',
                isbn: '123456',
                lancamento: new Date('2024-01-01'),
                nomeAutor: 'Autor 1',
                ativo: true,
            } as ObterLivroResponse);

            vi.spyOn(autorService, 'obterAutorId').mockResolvedValue({ id: 1, nome: 'Autor Teste' });
            vi.spyOn(livrosRepository, 'atualizarLivro').mockResolvedValue(undefined);

            await livrosService.atualizarLivro(1, parametros);

            expect(livrosRepository.atualizarLivro).toHaveBeenCalledWith(1, parametros);
        });

        it('deve lançar um erro se o livro não for encontrado', async () => {
            const parametros: AtualizarLivroRequest = {
                nome: 'Livro Atualizado',
                isbn: '987654321',
                lancamento: new Date('2025-06-01'),
                idAutor: 1,
                ativo: true,
            };

            vi.spyOn(livrosRepository, 'obterLivrosId').mockResolvedValue(null);

            await expect(livrosService.atualizarLivro(1, parametros)).rejects.toThrow(RegraDeNegocioException);
        });
    });

    describe('desativarLivro', () => {
        it('deve desativar um livro com sucesso', async () => {
            vi.spyOn(livrosRepository, 'obterLivrosId').mockResolvedValue({
                id: 1,
                nomeLivro: 'Livro 1',
                isbn: '123456',
                lancamento: new Date('2024-01-01'),
                nomeAutor: 'Autor 1',
                ativo: true,
            } as ObterLivroResponse);

            vi.spyOn(livrosRepository, 'deletarLivroId').mockResolvedValue(undefined);

            await livrosService.desativarLivro(1);

            expect(livrosRepository.deletarLivroId).toHaveBeenCalledWith(1);
        });

        it('deve lançar um erro se o livro não for encontrado ao tentar desativar', async () => {
            vi.spyOn(livrosRepository, 'obterLivrosId').mockResolvedValue(null);

            await expect(livrosService.desativarLivro(1)).rejects.toThrow(RegraDeNegocioException);
        });
    });
});
