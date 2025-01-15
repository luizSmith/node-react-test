import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('tb_pessoa')
export class Pessoa extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'cd_pessoa',
    })
    id: number;

    @Column({
        length: 55,
        name: 'nm_pessoa',
    })
    nome: string;

    @Column({
        length: 14,
        name: 'cd_cpf',
        unique: true,
    })
    cpf: string;

    @Column({
        type: 'date',
        name: 'dt_nascimento',
    })
    dataNascimento: string;

    @Column({
        length: 200,
        name: 'nm_logradouro',
    })
    logradouro: string;

    @Column({
        type: 'int',
        name: 'vl_numero',
    })
    numero: number;

    @Column({
        length: 200,
        name: 'nm_referencia',
    })
    referencia: string;

    @Column({
        name: 'ic_ativo',
    })
    ativo: boolean;

    @Column({ name: 'cd_cidade' })
    cidade: number;
}
