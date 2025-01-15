import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('tb_cidade')
export class Cidade extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'cd_cidade',
    })
    id: number;

    @Column({
        length: 70,
        name: 'nm_cidade',
    })
    nome: string;

    @Column({
        length: 2,
        name: 'sg_uf',
    })
    uf: string;
}
