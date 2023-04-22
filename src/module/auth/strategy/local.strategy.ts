import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ValidateUserLogin } from '../interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			usernameField: 'email',
			passwordField: 'password'
		});
	}

	async validate(
		email: string,
		candidatePassword: string
	): Promise<Omit<ValidateUserLogin, 'password'>> {
		return this.authService.validateUser(email, candidatePassword);
	}
}
