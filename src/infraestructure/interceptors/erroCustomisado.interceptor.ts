import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErroPersonalizadoException } from 'src/infraestructure/exceptions/erroPersonalizado.exception';

@Injectable()
export class ErroCustomisadoInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<unknown> {
        return next.handle().pipe(
            catchError((error) => {
                if (process.env.NODE_ENV === 'local') {
                    console.log(error);
                }

                const isExternalApiError = Object.prototype.hasOwnProperty.call(
                    error.response ? error.response : error,
                    'data'
                );

                if (isExternalApiError) {
                    const { message, statusCode } = error.response.data;
                    return throwError(
                        () =>
                            new ErroPersonalizadoException(message, statusCode)
                    );
                }

                const { message, statusCode } = error;
                return throwError(
                    () => new ErroPersonalizadoException(message, statusCode)
                );
            })
        );
    }
}
