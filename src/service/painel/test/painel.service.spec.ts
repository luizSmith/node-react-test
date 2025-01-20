import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Repository } from 'typeorm';

import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { ObterRankingLivrosMaisAlugadosAnoDAO, obterRankingLivrosMaisAtrasadosAnoDAO } from 'src/model/painel/obterRanking.dao';
import { PainelRepository } from 'src/repository/painel/painel.repository';
import { Aluguel } from 'src/repository/aluguel/entity/aluguel.entity';

describe('PainelRepository', () => {
    let painelRepository: PainelRepository;
    let aluguelRepository: Repository<Aluguel>;

    beforeEach(() => {
        aluguelRepository = {
            query: vi.fn(),
        } as unknown as Repository<Aluguel>;

        painelRepository = new PainelRepository(aluguelRepository);
    });

    describe('obterRankingLivrosMaisAlugadosAno', () => {
        it('deve retornar o ranking dos livros mais alugados de um ano', async () => {
            const ano = 2023;
            const mockRanking: ObterRankingLivrosMaisAlugadosAnoDAO[] = [
                { nomeCidade: 'Cidade 1', mes: 1, nomeLivro: 'Livro A', quantidadeAlugada: 10 },
                { nomeCidade: 'Cidade 1', mes: 2, nomeLivro: 'Livro B', quantidadeAlugada: 15 },
            ];

            vi.spyOn(aluguelRepository, 'query').mockResolvedValue(mockRanking);

            const resultado = await painelRepository.obterRankingLivrosMaisAlugadosAno(ano);

            expect(aluguelRepository.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'), [ano]);
            expect(resultado).toEqual(mockRanking);
        });

        it('deve lançar erro ao falhar ao obter o ranking de livros mais alugados', async () => {
            const ano = 2023;
            vi.spyOn(aluguelRepository, 'query').mockRejectedValue(new RegraDeNegocioException(['Erro no banco'], 400));

            await expect(painelRepository.obterRankingLivrosMaisAlugadosAno(ano)).rejects.toThrowError(RegraDeNegocioException);
        });
    });

    describe('obterRankingLivrosMaisAtrasadosAno', () => {
        it('deve retornar o ranking dos livros mais atrasados de um ano', async () => {
            const ano = 2023;
            const mockAtrasos: obterRankingLivrosMaisAtrasadosAnoDAO[] = [
                { nomeLivro: 'Livro A', mes: 1, totalAtraso: 5 },
                { nomeLivro: 'Livro B', mes: 2, totalAtraso: 8 },
            ];

            vi.spyOn(aluguelRepository, 'query').mockResolvedValue(mockAtrasos);

            const resultado = await painelRepository.obterRankingLivrosMaisAtrasadosAno(ano);

            expect(aluguelRepository.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'), [ano]);
            expect(resultado).toEqual(mockAtrasos);
        });

        it('deve lançar erro ao falhar ao obter o ranking de livros mais atrasados', async () => {
            const ano = 2023;
            vi.spyOn(aluguelRepository, 'query').mockRejectedValue(new RegraDeNegocioException(['Erro no banco'], 400));

            await expect(painelRepository.obterRankingLivrosMaisAtrasadosAno(ano)).rejects.toThrowError(RegraDeNegocioException);
        });
    });
});
