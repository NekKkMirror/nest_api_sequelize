import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../../../module/user/user.service';
import { throwHttpError } from '../utils/throw-httpError.util';

@Injectable()
export class DoesUserExistGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		return this.validateRequest(request);
	}

	private async validateRequest(request: Request): Promise<boolean> {
		const { email } = request.body;

		if (!email) {
			throwHttpError(404, `Not found: [email] - not found`);
		}

		const userExist = await this.userService.findOneByEmail(email);

		!!userExist &&
			throwHttpError(403, `Forbidden: [email - ${email}] is already exist`);

		return true;
	}
}
