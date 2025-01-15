import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm';

@Entity('tb_estado')
export class Estado extends BaseEntity {
    @PrimaryColumn({
        length: 2,
        name: 'sg_uf'
    })
    uf: string;

    @Column({
        length: 70,
        unique: true,
        name: 'nm_estado'
    })
    nome: string;
}
