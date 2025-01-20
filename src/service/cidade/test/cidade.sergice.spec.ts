import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CidadeService } from 'src/service/cidade/cidade.service';
import { CidadeRepository } from 'src/repository/cidade/cidade.repository';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { CriarCidadeDTO } from 'src/model/cidade/dto/criarCidade.dto';
import { ObterCidadeDTO } from 'src/model/cidade/dto/obterCidade.dto';
import { Cidade } from 'src/repository/cidade/entity/cidade.entity';

describe('CidadeService', () => {
    let cidadeService: CidadeService;
    let cidadeRepository: CidadeRepository;

    beforeEach(() => {
        cidadeRepository = {
            obterCidadeNomeUf: vi.fn(),
            criarCidade: vi.fn(),
        } as any;

        cidadeService = new CidadeService(cidadeRepository);
    });

    describe('obterCidadeNomeUf', () => {
        it('deve retornar uma cidade com sucesso', async () => {
            const parametros: ObterCidadeDTO = {
                nome: 'São Paulo',
                uf: 'SP',
            };

            const mockCidade = { id: 1, nome: 'São Paulo', uf: 'SP' } as Cidade;

            vi.spyOn(cidadeRepository, 'obterCidadeNomeUf').mockResolvedValue(mockCidade);

            const result = await cidadeService.obterCidadeNomeUf(parametros);

            expect(result).toEqual(mockCidade);
            expect(cidadeRepository.obterCidadeNomeUf).toHaveBeenCalledWith(parametros);
        });

        it('deve lançar erro quando ocorrer um problema ao obter a cidade', async () => {
            const parametros: ObterCidadeDTO = {
                nome: 'São Paulo',
                uf: 'SP',
            };

            vi.spyOn(cidadeRepository, 'obterCidadeNomeUf').mockRejectedValue(new Error('Erro ao consultar cidade'));

            await expect(cidadeService.obterCidadeNomeUf(parametros)).rejects.toThrowError(
                RegraDeNegocioException
            );
        });
    });

    describe('criarCidade', () => {
        it('deve criar uma cidade com sucesso', async () => {
            const parametros: CriarCidadeDTO = {
                nome: 'São Paulo',
                uf: 'SP',
            };

            const mockCidade = { id: 1, nome: 'São Paulo', uf: 'SP' } as Cidade;

            vi.spyOn(cidadeRepository, 'criarCidade').mockResolvedValue(mockCidade);

            const result = await cidadeService.criarCidade(parametros);

            expect(result).toEqual(mockCidade);
            expect(cidadeRepository.criarCidade).toHaveBeenCalledWith(parametros);
        });

        it('deve lançar erro quando ocorrer um problema ao criar a cidade', async () => {
            const parametros: CriarCidadeDTO = {
                nome: 'São Paulo',
                uf: 'SP',
            };

            vi.spyOn(cidadeRepository, 'criarCidade').mockRejectedValue(RegraDeNegocioException);

            await expect(cidadeService.criarCidade(parametros)).rejects.toThrowError(
                RegraDeNegocioException
            );
        });
    });
});
