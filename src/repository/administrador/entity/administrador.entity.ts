import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_adminstrador', {
  database: 'db_biblioteca',
})
export class Administrador extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'cd_adm',
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Column({
    name: 'nm_adm',
    type: 'varchar',
    width: 55,
  })
  nome: string;

  @Column({
    name: 'cd_cpf',
    type: 'varchar',
    width: 14,
  })
  cpf: string;

  @Column({
    name: 'nm_email',
    type: 'varchar',
    width: 80,
  })
  email: string;

  @Column({
    name: 'nm_senha',
    type: 'varchar',
    width: 80,
  })
  senha: string;

  @Column({
    name: 'dt_nascimento',
    type: 'date',
  })
  nascimento: string;
}
