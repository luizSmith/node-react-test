import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_copia_livro', {
    database: 'db_biblioteca',
})
export class Copias extends BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'cd_copia',
    })
    id: number;

    @Column({
        name: 'dt_estoque',
    })
    dtEstoque: Date;

    @Column({
        name: 'ic_ativo',
    })
    ativo: boolean;

    @Column({
        name: 'cd_livro',
    })
    idLivro: number;
}