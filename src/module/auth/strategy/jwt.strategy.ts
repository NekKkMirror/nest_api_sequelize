import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { throwHttpError } from '../../../core/common/utils/throw-httpError.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTKEY
		});
	}

	async validate(payload: any) {
		console.log(true);
		const userDB = await this.userService.findOneById(payload.id);

		!userDB &&
			throwHttpError(401, ' are not authorized to perform the operation');

		return payload;
	}
}
