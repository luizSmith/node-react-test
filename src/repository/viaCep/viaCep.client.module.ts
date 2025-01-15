import { Module } from '@nestjs/common';
import { ViaCepClient } from './viaCep.client';

@Module({
    exports: [ViaCepClient],
    providers: [ViaCepClient],
})
export class ViaCepClientModule { }