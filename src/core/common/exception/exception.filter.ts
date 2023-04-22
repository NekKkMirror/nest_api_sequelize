import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const statusCode = exception.getStatus();

		return response.status(statusCode).json({
			errorInfo: exception.getResponse(),
			time: new Date().toTimeString(),
			path: request.url
		});
	}
}
