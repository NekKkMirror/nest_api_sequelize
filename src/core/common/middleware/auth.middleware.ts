import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor() {}

	use(req: Request, _: Response, next: NextFunction) {
		const { authorization } = req.headers;

		if (!authorization) {
			throw new HttpException(
				{
					message: 'Missing authorization Header'
				},
				HttpStatus.BAD_REQUEST
			);
		}

		return next();
	}
}
