import { TypeOrmModule } from "@nestjs/typeorm";
import { Cidade } from "./entity/cidade.entity";
import { Estado } from "./entity/estado.entity";
import { CidadeRepository } from "./cidade.repository";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Cidade, Estado])],
    providers: [CidadeRepository],
    exports: [CidadeRepository],
})
export class CidadeRepositoryModule { }