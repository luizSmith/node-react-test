import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_livro', {
  database: 'db_biblioteca',
})
export class Livros extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'cd_livro',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'nm_livro',
    type: 'varchar',
    width: 55,
  })
  nome: string;

  @Column({
    name: 'dt_lancamento',
    type: 'varchar',
    width: 55,
  })
  lancamento: Date;

  @Column({
    name: 'cd_isbn',
    type: 'varchar',
    width: 13,
  })
  isbn: string;

  @Column({
    name: 'ic_ativo',
  })
  ativo: boolean;

  @Column({
    name: 'cd_autor',
    type: 'varchar',
    width: 55,
  })
  idAutor: number;
}
