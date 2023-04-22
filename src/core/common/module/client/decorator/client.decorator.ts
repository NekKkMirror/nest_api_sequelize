import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ClientService } from '../client.service';
import { Request, Response } from 'express';

export const ClientDecorator = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const { getRequest, getResponse } = ctx.switchToHttp();

		return ClientService.getInstance(
			getRequest<Request>(),
			getResponse<Response>()
		);
	}
);
