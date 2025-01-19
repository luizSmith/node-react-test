import { ApiProperty } from '@nestjs/swagger';

class DadosLivroResponse {
    @ApiProperty({
        description: 'Nome do livro que foi alugado.',
    })
    nomeLivro: string;

    @ApiProperty({
        description: 'Quantidade de vezes que o livro foi alugado durante o mês.',
    })
    quantidadeAlugada: number;
}

class DadosCidade {
    @ApiProperty({
        description: 'Mês do ano no qual o livro foi alugado.',
    })
    mes: number;

    @ApiProperty({
        description: 'Lista de livros mais alugados naquele mês.',
        type: [DadosLivroResponse],
        isArray: true
    })
    livros: DadosLivroResponse[];
}

export class DadosCidadeResponse {
    @ApiProperty({
        description: 'Nome da cidade onde os livros foram alugados.',
    })
    nomeCidade: string;

    @ApiProperty({
        description: 'Lista de dados de aluguel por mês na cidade.',
        type: [DadosCidade],
        isArray: true,
    })
    dadosCidade: DadosCidade[];
}

export class ObterRankingLivrosMaisAlugadosAnoResponse {
    @ApiProperty({
        description: 'Ano ao qual o ranking se refere.',
    })
    ano: number;

    @ApiProperty({
        description: 'Lista de cidades com seus respectivos rankings de livros.',
        type: [DadosCidadeResponse],
        isArray: true
    })
    dados: DadosCidadeResponse[];
}


class LivroAtraso {
    @ApiProperty({
        description: 'Nome do livro',
    })
    nomeLivro: string;

    @ApiProperty({
        description: 'Numero de atrasos',
    })
    totalAtrasos: number;
};

export class DadosMes {
    @ApiProperty({
        description: 'Mês correspondente',
    })
    mes: number;

    @ApiProperty({
        description: 'Dados correspondentes ao mes',
        type: [LivroAtraso],
        isArray: true,
    })
    dadosMes: LivroAtraso[];
};

export class ObterRankingLivrosAtrasoResponse {
    @ApiProperty({
        description: 'Ano Correspondente',
    })
    ano: number;

    @ApiProperty({
        description: 'Dados de atraso',
        type: [DadosMes],
        isArray: true,
    })
    dados: DadosMes[];
};
