import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, } from 'typeorm';

@Entity('tb_aluguel', {
    database: 'db_biblioteca',
})
export class Aluguel extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'cd_aluguel'
    })
    id: number;

    @Column({
        name: 'dt_retirada'
    })
    dtRetirada: Date;

    @Column({
        type: 'date',
        name: 'dt_prazo'
    })
    dtPrazo: Date;

    @Column({
        name: 'dt_devolucao',
        nullable: true
    })
    dtDevolucao: Date | null;

    @Column({
        name: 'cd_pessoa'
    })
    idPessoa: number;

    @Column({
        name: 'cd_copia'
    })
    idCopiaLivro: number;
}
