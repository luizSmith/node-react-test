import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as Axios from 'axios';
import { firstValueFrom } from 'rxjs';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exception';
import { AxiosErrorInterceptorResponse } from 'src/model/client/viaCep/axiosErrorInterceptor.response';
import { ObterEnderecoPeloCepDAO } from 'src/model/client/viaCep/dao/obterEnderecoPeloCep.dao';

@Injectable()
export class ViaCepClient {
    private readonly _httpService: HttpService;
    private nomeApi = 'CLIENT-VIA-CEP';

    constructor(
    ) {
        const baseURL = process.env.VIA_CEP_API_URL;

        const instance = Axios.default.create({
            baseURL,
        });

        this._httpService = new HttpService(instance);
        this._httpService.axiosRef.interceptors.response.use(
            (config) => {
                return this.responseSuccessInterceptor(config);
            },
            (error) => {
                return this.responseErrorInterceptor(error);
            }
        );
    }

    private async responseSuccessInterceptor(
        response: Axios.AxiosResponse<unknown>
    ): Promise<Axios.AxiosResponse<unknown>> {
        const start = response.config.headers?.['request-startTime'];

        const milliseconds = this._calculateResponseMS(Number(start));

        console.info(this.nomeApi,
            `SUCCESS - ${milliseconds}ms`,
            {
                requestData: JSON.stringify(response.config),
            }
        )

        return response;
    }

    private async responseErrorInterceptor(
        axiosError: Axios.AxiosError<AxiosErrorInterceptorResponse>
    ): Promise<Axios.AxiosError<AxiosErrorInterceptorResponse>> {
        const { config, response } = axiosError;
        const start = config.headers?.['request-startTime'];

        if (!response) return axiosError;

        const milliseconds = this._calculateResponseMS(Number(start));

        if (response.status === 500) {
            console.error(this.nomeApi,
                `EMERGENCY - ${milliseconds}ms - ${response.request.path} - ${response.status}`,
                {
                    requestConfig: JSON.stringify(response.config),
                    requestData: JSON.stringify(response.data),
                },
            )

            throw new ErroPersonalizadoException(
                'Erro interno, favor entrar em contato com o time de suporte',
                502
            );
        } else {
            console.info(
                this.nomeApi,
                `NOTICE - ${milliseconds}ms - ${response.request.path} - ${response.status}`,
                {
                    requestConfig: JSON.stringify(response.config),
                    requestData: JSON.stringify(response.data),
                }
            );

            throw new ErroPersonalizadoException(
                'Erro ao obter Endereço, CEP pode não ser válido',
                400
            );
        }
    }

    private _calculateResponseMS(start: number | undefined): number {
        if (!start) return -1;

        const end = Date.now();
        return new Date(end - start).getMilliseconds();
    }

    async obterEnderecoPeloCep(
        cep: string
    ): Promise<ObterEnderecoPeloCepDAO> {
        const { data } = await firstValueFrom(
            this._httpService.get<ObterEnderecoPeloCepDAO>(
                `${cep}/json`
            )
        );
        return data;
    }
}
