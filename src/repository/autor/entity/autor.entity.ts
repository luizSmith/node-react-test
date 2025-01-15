import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_autor', {
  database: 'db_biblioteca',
})
export class Autor extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'cd_autor',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'nm_autor',
    type: 'varchar',
    width: 55,
  })
  nome: string;
}
