import { HttpException } from '@nestjs/common/exceptions/http.exception';

export function throwHttpError(
	statusCode: number,
	message: string
): HttpException {
	throw new HttpException(
		{
			message
		},
		statusCode
	);
}
