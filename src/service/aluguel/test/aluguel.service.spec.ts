import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AluguelService } from '../aluguel.service';
import { AluguelRepository } from 'src/repository/aluguel/aluguel.repository';
import { RegraDeNegocioException } from 'src/infraestructure/exceptions/regraDeNegocio.exception';
import { RegistrarAlugueRequest } from 'src/controller/aluguel/request/registrarAluguel.request';
import { ObterCopiasDisponiveisDAO } from 'src/model/aluguel/dao/obterAluguel.dao';
import { RegistrarAluguelDAO } from 'src/model/aluguel/dao/registrarAluguel.dao';
import { PessoaService } from 'src/service/pessoa/pessoa.service';

describe('AluguelService', () => {
    let aluguelService: AluguelService;
    let aluguelRepository: AluguelRepository;
    let pessoaService: PessoaService;

    const dataPrazo = new Date();
    dataPrazo.setDate(dataPrazo.getDate() + 5);

    beforeEach(() => {
        aluguelRepository = {
            registrarAluguel: vi.fn(),
            obterAluguelExistenteCopiaId: vi.fn(),
            obterCopiasDisponiveis: vi.fn(),
            finalizarAluguel: vi.fn(),
            obterAtrasosPessoaId: vi.fn(),
            obterAluguelPessoaId: vi.fn(),
            obterAluguelId: vi.fn(),
        } as any;

        pessoaService = {
            obterPessoaId: vi.fn(),
        } as any;

        aluguelService = new AluguelService(aluguelRepository, pessoaService);
    });

    describe('registrarAluguel', () => {
        it('deve registrar um aluguel com sucesso', async () => {
            const parametros: RegistrarAlugueRequest = {
                idPessoa: 1,
                idCopia: 1,
                dataPrazo: dataPrazo,
            };

            const mockPessoa = {
                id: 1,
                nome: 'Pessoa Teste',
                cpf: '69259616000',
                dataNascimento: '1911-10-03',
                logradouro: 'Av. Sampáio',
                numero: 14,
                referencia: 'Perto da praça princial',
                cidade: 'Mogi das Cruzes',
                estado: 'SP',
                ativo: true,
            };
            const mockAluguelExistente = null;

            vi.spyOn(pessoaService, 'obterPessoaId').mockResolvedValue(mockPessoa);
            vi.spyOn(aluguelRepository, 'obterAluguelExistenteCopiaId').mockResolvedValue(mockAluguelExistente);
            vi.spyOn(aluguelRepository, 'obterAtrasosPessoaId').mockResolvedValue([]);

            const mockAluguelCriado: RegistrarAluguelDAO = {
                id: 1,
                idCopiaLivro: 1,
                idPessoa: 1,
                dtDevolucao: null,
                dtRetirada: new Date(),
                dtPrazo: parametros.dataPrazo,
            };

            vi.spyOn(aluguelRepository, 'registrarAluguel').mockResolvedValue(mockAluguelCriado);

            const result = await aluguelService.registrarAluguel(parametros);

            expect(result).toEqual(mockAluguelCriado);
        });

        it('deve lançar erro se o aluguel já existir', async () => {
            const parametros: RegistrarAlugueRequest = {
                idPessoa: 1,
                idCopia: 1,
                dataPrazo: new Date(),
            };

            const mockPessoa = {
                id: 1,
                nome: 'Pessoa Teste',
                cpf: '69259616000',
                dataNascimento: '1911-10-03',
                logradouro: 'Av. Sampáio',
                numero: 14,
                referencia: 'Perto da praça princial',
                cidade: 'Mogi das Cruzes',
                estado: 'SP',
                ativo: true,
            };
            const mockAluguelExistente = {
                idLivro: 1,
                nomeLivro: 'Senhor dos anéis',
                idCopia: 1,
                idAluguel: 1,
            };

            vi.spyOn(pessoaService, 'obterPessoaId').mockResolvedValue(mockPessoa);
            vi.spyOn(aluguelRepository, 'obterAtrasosPessoaId').mockResolvedValue([]);
            vi.spyOn(aluguelRepository, 'obterAluguelExistenteCopiaId').mockResolvedValue(mockAluguelExistente);

            await expect(aluguelService.registrarAluguel(parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });

        it('deve lançar erro se a pessoa tiver mais de 2 atrasos', async () => {
            const parametros: RegistrarAlugueRequest = {
                idPessoa: 1,
                idCopia: 1,
                dataPrazo: dataPrazo,
            };

            const mockPessoa = {
                id: 1,
                nome: 'Pessoa Teste',
                cpf: '69259616000',
                dataNascimento: '1911-10-03',
                logradouro: 'Av. Sampáio',
                numero: 14,
                referencia: 'Perto da praça princial',
                cidade: 'Mogi das Cruzes',
                estado: 'SP',
                ativo: true,
            };
            const mockAtrasos = [
                {
                    idLivro: 1,
                    nomeLivro: 'Senhor dos anéis',
                    idCopia: 1,
                    idAluguel: 1,
                },
                {
                    idLivro: 2,
                    nomeLivro: 'Clean Clode',
                    idCopia: 5,
                    idAluguel: 3,
                },
                {
                    idLivro: 5,
                    nomeLivro: 'Full Metal Alchemist V1',
                    idCopia: 10,
                    idAluguel: 5,
                },
            ];

            vi.spyOn(aluguelRepository, 'obterAtrasosPessoaId').mockResolvedValue(mockAtrasos);
            vi.spyOn(pessoaService, 'obterPessoaId').mockResolvedValue(mockPessoa);

            await expect(aluguelService.registrarAluguel(parametros)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('obterQuantidadeDisponiveisLivroId', () => {
        it('deve retornar a quantidade de cópias disponíveis', async () => {
            const mockCopiasDisponiveis: ObterCopiasDisponiveisDAO = { idLivro: 1, nomeLivro: 'Senhor dos anéis', quantidadeDisponivel: 3 };

            vi.spyOn(aluguelRepository, 'obterCopiasDisponiveis').mockResolvedValue(mockCopiasDisponiveis);

            const result = await aluguelService.obterQuantidadeDisponiveisLivroId(1);

            expect(result).toEqual(mockCopiasDisponiveis);
        });

        it('deve lançar erro se não houver cópias disponíveis', async () => {
            const mockCopiasDisponiveis: ObterCopiasDisponiveisDAO = { idLivro: 1, nomeLivro: 'Senhor dos anéis', quantidadeDisponivel: 0 };

            vi.spyOn(aluguelRepository, 'obterCopiasDisponiveis').mockResolvedValue(mockCopiasDisponiveis);

            await expect(aluguelService.obterQuantidadeDisponiveisLivroId(1)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('finalizarAluguel', () => {
        it('deve finalizar um aluguel com sucesso', async () => {
            const dataRetirada = new Date()
            dataRetirada.setDate(dataRetirada.getDate() - 4);

            const mockAluguelExistente = {
                id: 1,
                idPessoa: 1,
                idCopiaLivro: 1,
                idLivro: 2,
                nomeLivro: 'Clean Clode',
                idCopia: 5,
                idAluguel: 3,
                dtRetirada: dataRetirada,
            };

            vi.spyOn(aluguelRepository, 'obterAluguelId').mockResolvedValue(mockAluguelExistente);
            vi.spyOn(aluguelRepository, 'finalizarAluguel').mockResolvedValue(undefined);

            await expect(aluguelService.finalizarAluguel(1)).resolves.not.toThrow();
        });

        it('deve lançar erro se o aluguel não existir', async () => {
            vi.spyOn(aluguelRepository, 'obterAluguelId').mockResolvedValue(null);

            await expect(aluguelService.finalizarAluguel(1)).rejects.toThrow(
                RegraDeNegocioException
            );
        });
    });

    describe('obterAluguelPessoaId', () => {
        it('deve retornar os aluguéis de uma pessoa', async () => {
            const mockAlugueis = [{
                id: 1,
                idPessoa: 1,
                idCopiaLivro: 1,
                idLivro: 2,
                nomeLivro: 'Clean Clode',
                idCopia: 5,
                idAluguel: 3,
                dtRetirada: new Date()
            }];

            const mockPessoa = {
                id: 1,
                nome: 'Pessoa Teste',
                cpf: '69259616000',
                dataNascimento: '1911-10-03',
                logradouro: 'Av. Sampáio',
                numero: 14,
                referencia: 'Perto da praça princial',
                cidade: 'Mogi das Cruzes',
                estado: 'SP',
                ativo: true,
            };
            vi.spyOn(pessoaService, 'obterPessoaId').mockResolvedValue(mockPessoa);
            vi.spyOn(aluguelRepository, 'obterAluguelPessoaId').mockResolvedValue(mockAlugueis);

            const result = await aluguelService.obterAluguelPessoaId(1);

            expect(result).toEqual(mockAlugueis);
        });
    });
});
