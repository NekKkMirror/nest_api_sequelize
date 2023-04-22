import {
	CallHandler,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> {
		return next
			.handle()
			.pipe(
				catchError(() =>
					throwError(
						new HttpException(
							{ message: 'BAD_GATEWAY' },
							HttpStatus.BAD_GATEWAY
						)
					)
				)
			);
	}
}
