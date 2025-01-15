import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Pessoa } from "./entity/pessoas.entity";
import { PessoaRepository } from "./pessoa.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Pessoa])],
    providers: [PessoaRepository],
    exports: [PessoaRepository],
})
export class PessoaRepositoryModule { }