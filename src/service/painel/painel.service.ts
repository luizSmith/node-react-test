import { Injectable } from "@nestjs/common";
import { ObterRankingLivrosAtrasoResponse, ObterRankingLivrosMaisAlugadosAnoResponse } from "src/controller/painel/response/obterRanking.response";
import { RegraDeNegocioException } from "src/infraestructure/exceptions/regraDeNegocio.exception";
import { ObterRankingLivrosMaisAlugadosAnoDAO, obterRankingLivrosMaisAtrasadosAnoDAO } from "src/model/painel/obterRanking.dao";
import { PainelRepository } from "src/repository/painel/painel.repository";

@Injectable()
export class PainelService {
    constructor(
        private _painelRepository: PainelRepository,
    ) { }

    async obterRankingLivrosMaisAlugadosAno(ano: number): Promise<ObterRankingLivrosMaisAlugadosAnoResponse> {
        try {
            const dados = await this._painelRepository.obterRankingLivrosMaisAlugadosAno(ano);

            return this.__mappingRankingLivrosCidadeAnoResponse(dados, ano);
        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro obter ranking livros do ano"], 400
            );
        }
    }

    private __mappingRankingLivrosCidadeAnoResponse(dadosAluguel: ObterRankingLivrosMaisAlugadosAnoDAO[], ano: number): ObterRankingLivrosMaisAlugadosAnoResponse {
        const resultado: ObterRankingLivrosMaisAlugadosAnoResponse = {
            ano,
            dados: [],
        };

        dadosAluguel.forEach((item: ObterRankingLivrosMaisAlugadosAnoDAO) => {
            let cidade = resultado.dados.find(cidade => cidade.nomeCidade === item.nomeCidade);
            if (!cidade) {
                cidade = { nomeCidade: item.nomeCidade, dadosCidade: [] };
                resultado.dados.push(cidade);
            }

            let mesDados = cidade.dadosCidade.find(dados => dados.mes === item.mes);
            if (!mesDados) {
                mesDados = { mes: item.mes, livros: [] };
                cidade.dadosCidade.push(mesDados);
            }

            const livro = mesDados.livros.find(livro => livro.nomeLivro === item.nomeLivro);
            if (livro) {
                livro.quantidadeAlugada += item.quantidadeAlugada;
            } else {
                mesDados.livros.push({
                    nomeLivro: item.nomeLivro,
                    quantidadeAlugada: item.quantidadeAlugada,
                });
            }
        });

        return resultado;
    }

    async obterRankingLivrosMaisAtrasadosAno(ano: number): Promise<ObterRankingLivrosAtrasoResponse> {

        try {
            const dados = await this._painelRepository.obterRankingLivrosMaisAtrasadosAno(ano);

            return this.__mappingRankingLivrosAtrasoAnoResponse(dados, ano);

        } catch (error) {
            console.error(error)
            throw new RegraDeNegocioException(
                ["Erro obter ranking atrasados do ano"], 400
            );
        }
    }

    private __mappingRankingLivrosAtrasoAnoResponse(dadosAluguel: obterRankingLivrosMaisAtrasadosAnoDAO[], ano: number): ObterRankingLivrosAtrasoResponse {
        const resultado: ObterRankingLivrosAtrasoResponse = {
            ano,
            dados: [],
        };

        dadosAluguel.forEach((item: obterRankingLivrosMaisAtrasadosAnoDAO) => {
            let mesDados = resultado.dados.find(dado => dado.mes === item.mes);
            if (!mesDados) {
                mesDados = { mes: item.mes, dadosMes: [] };
                resultado.dados.push(mesDados);
            }

            const livro = mesDados.dadosMes.find(livro => livro.nomeLivro === item.nomeLivro);
            if (livro) {
                livro.totalAtrasos += item.totalAtraso;
            } else {
                mesDados.dadosMes.push({
                    nomeLivro: item.nomeLivro,
                    totalAtrasos: item.totalAtraso,
                });
            }
        });

        return resultado;
    }

}