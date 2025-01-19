import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ObterRankingLivrosMaisAlugadosAnoDAO, obterRankingLivrosMaisAtrasadosAnoDAO } from "src/model/painel/obterRanking.dao";
import { Aluguel } from "../aluguel/entity/aluguel.entity";

@Injectable()
export class PainelRepository {
    constructor(
        @InjectRepository(Aluguel)
        private readonly _aluguelRepository: Repository<Aluguel>,
    ) { }

    async obterRankingLivrosMaisAlugadosAno(ano: number): Promise<ObterRankingLivrosMaisAlugadosAnoDAO[]> {
        const aluguel = await this._aluguelRepository
            .query(`WITH AlugueisPorCidade AS (
                    SELECT 
                        c.nm_cidade,
                        l.nm_livro,
                        YEAR(a.dt_retirada) AS ano,
                        MONTH(a.dt_retirada) AS mes,
                        COUNT(a.cd_aluguel) AS quantidadeAlugada
                    FROM 
                        tb_aluguel a
                    INNER JOIN 
                        tb_copia_livro cl ON a.cd_copia = cl.cd_copia
                    INNER JOIN 
                        tb_livro l ON cl.cd_livro = l.cd_livro
                    INNER JOIN 
                        tb_pessoa p ON a.cd_pessoa = p.cd_pessoa
                    INNER JOIN 
                        tb_cidade c ON p.cd_cidade = c.cd_cidade
                    WHERE 
                        YEAR(a.dt_retirada) = ?
                    GROUP BY 
                        c.nm_cidade, l.nm_livro, YEAR(a.dt_retirada), MONTH(a.dt_retirada)
                ),
                RankedLivrosPorCidade AS (
                    SELECT 
                        nm_cidade,
                        nm_livro,
                        ano,
                        mes,
                        quantidadeAlugada,
                        RANK() OVER (PARTITION BY nm_cidade, ano, mes ORDER BY quantidadeAlugada DESC) AS livroRank
                    FROM 
                        AlugueisPorCidade
                )
                SELECT 
                    nm_cidade nomeCidade,
                    mes,
                    nm_livro nomeLivro,
                    quantidadeAlugada
                FROM 
                    RankedLivrosPorCidade
                WHERE 
                    livroRank <= 3
                ORDER BY 
                    nm_cidade, mes, livroRank;
            `, [ano])

        return aluguel;
    }

    async obterRankingLivrosMaisAtrasadosAno(ano: number): Promise<obterRankingLivrosMaisAtrasadosAnoDAO[]> {
        const atrasos = await this._aluguelRepository
            .query(`WITH AtrasosPorLivro AS (
                    SELECT 
                        l.nm_livro,
                        YEAR(a.dt_retirada) AS ano,
                        MONTH(a.dt_retirada) AS mes,
                        DATEDIFF(a.dt_devolucao, a.dt_prazo) AS atrasosDias
                    FROM 
                        tb_aluguel a
                    INNER JOIN 
                        tb_copia_livro cl ON a.cd_copia = cl.cd_copia
                    INNER JOIN 
                        tb_livro l ON cl.cd_livro = l.cd_livro
                    WHERE 
                        a.dt_devolucao IS NOT NULL
                        AND YEAR(a.dt_retirada) = ?
                        AND DATEDIFF(a.dt_devolucao, a.dt_prazo) > 0
                ),
                RankedAtrasosPorLivro AS (
                    SELECT 
                        nm_livro,
                        ano,
                        mes,
                        SUM(atrasosDias) AS totalAtraso,
                        RANK() OVER (PARTITION BY ano, mes ORDER BY SUM(atrasosDias) DESC) AS rankAtrasos
                    FROM 
                        AtrasosPorLivro
                    GROUP BY 
                        nm_livro, ano, mes
                )
                SELECT 
                    ano,
                    mes,
                    nm_livro nomeLivro,
                    totalAtraso
                FROM 
                    RankedAtrasosPorLivro
                WHERE 
                    rankAtrasos <= 3
                ORDER BY 
                    ano, mes, rankAtrasos;
            `, [ano])

        return atrasos;
    }

}