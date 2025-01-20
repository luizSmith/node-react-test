import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PessoaService } from 'src/service/pessoa/pessoa.service';
import { PessoaRepository } from 'src/repository/pessoa/pessoa.repository';
import { ViaCepClient } from 'src/repository/client/viaCep/viaCep.client';
import { CidadeService } from 'src/service/cidade/cidade.service';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { CriarPessoaRequest } from 'src/controller/pessoa/request/criarPessoa.request';
import { Cidade } from 'src/repository/cidade/entity/cidade.entity';
import { CriarPressoaDAO } from 'src/model/pessoa/dao/criarPessoa.dao';
import { ObterEnderecoPeloCepDAO } from 'src/model/client/viaCep/dao/obterEnderecoPeloCep.dao';
import { ObterPessoaDAO } from 'src/model/pessoa/dao/obterPessoa.dao';

vi.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
}));

describe('PessoaService', () => {
    let pessoaService: PessoaService;
    let pessoaRepository: PessoaRepository;
    let viaCepClient: ViaCepClient;
    let cidadeService: CidadeService;

    beforeEach(() => {
        pessoaRepository = {
            obterPessoaId: vi.fn(),
            criarPessoa: vi.fn(),
            atualizarPessoa: vi.fn(),
            deletarPessoaId: vi.fn(),
        } as any;

        viaCepClient = {
            obterEnderecoPeloCep: vi.fn(),
        } as any;

        cidadeService = {
            obterCidadeNomeUf: vi.fn(),
            criarCidade: vi.fn(),
        } as any;

        pessoaService = new PessoaService(pessoaRepository, viaCepClient, cidadeService);
    });

    describe('criarPessoa', () => {
        it('deve criar uma nova pessoa com sucesso', async () => {
            const parametros: CriarPessoaRequest = {
                nome: 'Pessoa Teste',
                cpf: '69259616000',
                dataNascimento: '1990-01-01',
                logradouro: 'Rua Teste',
                numero: 100,
                referencia: 'Perto da praça',
                cep: '12345678',
            };

            const mockEndereco = {
                cep: '12345678',
                logradouro: 'Rua Teste',
                complemento: 'Apto 101',
                bairro: 'Centro',
                localidade: 'Cidade Teste',
                uf: 'SP',
                ibge: '1234567',
                gia: '1234',
                ddd: '11',
                siafi: '1234',
            };

            const mockCidade = { id: 1, nome: 'Cidade Teste', uf: 'SP' } as Cidade;
            const mockPessoa: CriarPressoaDAO = { id: 1, ...parametros, ativo: true, cidade: 1 };

            vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockResolvedValue(mockEndereco);
            vi.spyOn(cidadeService, 'obterCidadeNomeUf').mockResolvedValue(mockCidade);
            vi.spyOn(pessoaRepository, 'criarPessoa').mockResolvedValue(mockPessoa);

            const result = await pessoaService.criarPessoa(parametros);

            expect(pessoaRepository.criarPessoa).toHaveBeenCalledWith({
                nome: parametros.nome,
                cpf: parametros.cpf,
                dataNascimento: parametros.dataNascimento,
                logradouro: parametros.logradouro,
                numero: parametros.numero,
                referencia: parametros.referencia,
                cidade: mockCidade.id,
            });

            expect(result).toEqual({
                id: 1,
                nome: 'Pessoa Teste',
                cpf: '69259616000',
                dataNascimento: '1990-01-01',
                logradouro: 'Rua Teste',
                numero: 100,
                referencia: 'Perto da praça',
                cidade: 'Cidade Teste',
                ativo: true,
                estado: 'SP',
            });
        });

        it('deve lançar erro se o CEP não for válido', async () => {
            const parametros: CriarPessoaRequest = {
                nome: 'Pessoa Teste',
                cpf: '69259616000',
                dataNascimento: '1990-01-01',
                logradouro: 'Rua Teste',
                numero: 100,
                referencia: 'Perto da praça',
                cep: '00000000',
            };

            vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockResolvedValue({
                erro: 'true',
            } as ObterEnderecoPeloCepDAO);

            await expect(pessoaService.criarPessoa(parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('atualizarPessoa', () => {
        it('deve atualizar a pessoa com sucesso', async () => {
            const parametros = {
                nome: 'Pessoa Atualizada',
                cpf: '69259616000',
                logradouro: 'Rua Teste Atualizada',
                numero: 101,
                referencia: 'Perto do supermercado',
                cep: '12345678',
                ativo: true,
            };

            const mockEndereco = {
                cep: '12345678',
                logradouro: 'Rua Teste Atualizada',
                complemento: 'Apto 102',
                bairro: 'Centro',
                localidade: 'Cidade Teste',
                uf: 'SP',
                ibge: '1234567',
                gia: '1234',
                ddd: '11',
                siafi: '1234',
            };

            const mockCidade = { id: 1, nome: 'Cidade Teste', uf: 'SP' } as Cidade;

            vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockResolvedValue(mockEndereco);
            vi.spyOn(cidadeService, 'obterCidadeNomeUf').mockResolvedValue(mockCidade);
            vi.spyOn(pessoaRepository, 'atualizarPessoa').mockResolvedValue(undefined);

            await pessoaService.atualizarPessoa(1, parametros);
        });

        it('deve lançar erro se o CEP não for válido ao atualizar', async () => {
            const parametros = {
                nome: 'Pessoa Atualizada',
                cpf: '69259616000',
                logradouro: 'Rua Teste Atualizada',
                numero: 101,
                referencia: 'Perto do supermercado',
                cep: 'invalid-cep',
                ativo: true,
            };

            vi.spyOn(viaCepClient, 'obterEnderecoPeloCep').mockResolvedValue({ erro: 'true' } as ObterEnderecoPeloCepDAO);

            await expect(pessoaService.atualizarPessoa(1, parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('obterPessoaId', () => {
        it('deve retornar a pessoa corretamente', async () => {
            const mockPessoa: ObterPessoaDAO = {
                id: 1, nome: 'Pessoa Atualizada',
                cpf: '69259616000',
                logradouro: 'Rua Teste Atualizada',
                dataNascimento: '1990-01-01',
                cidade: 'Praia Grande',
                estado: 'SP',
                numero: 101,
                referencia: 'Perto do supermercado',
                ativo: true,
            };
            vi.spyOn(pessoaRepository, 'obterPessoaId').mockResolvedValue(mockPessoa);

            const result = await pessoaService.obterPessoaId(1);

            expect(result).toEqual(mockPessoa);
        });

        it('deve lançar erro se a pessoa não for encontrada', async () => {
            vi.spyOn(pessoaRepository, 'obterPessoaId').mockResolvedValue(null);

            await expect(pessoaService.obterPessoaId(1)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('desativarPessoaId', () => {
        it('deve desativar a pessoa corretamente', async () => {
            const mockPessoa: ObterPessoaDAO = {
                id: 1, nome: 'Pessoa Atualizada',
                cpf: '69259616000',
                logradouro: 'Rua Teste Atualizada',
                dataNascimento: '1990-01-01',
                cidade: 'Praia Grande',
                estado: 'SP',
                numero: 101,
                referencia: 'Perto do supermercado',
                ativo: true,
            };
            vi.spyOn(pessoaRepository, 'obterPessoaId').mockResolvedValue(mockPessoa);
            vi.spyOn(pessoaRepository, 'deletarPessoaId').mockResolvedValue(undefined);

            await pessoaService.desativarPessoaId(1);

            expect(pessoaRepository.deletarPessoaId).toHaveBeenCalledWith(1);
        });

        it('deve lançar erro se a pessoa não for encontrada ao desativar', async () => {
            vi.spyOn(pessoaRepository, 'obterPessoaId').mockResolvedValue(null);

            await expect(pessoaService.desativarPessoaId(1)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });
});
