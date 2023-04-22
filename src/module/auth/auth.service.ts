import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';
import { throwHttpError } from '../../core/common/utils/throw-httpError.util';
import { ValidateUserLogin } from './interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(
		email: string,
		candidatePassword: string
	): Promise<Omit<ValidateUserLogin, 'password'>> {
		const dbUser = await this.userService.findOneByEmail(email);

		!dbUser &&
			throwHttpError(400, `Bad request: [email - ${email}] is not defined`);

		const isValidPassword = await this.comparePassword(
			candidatePassword,
			dbUser.password
		);

		!isValidPassword &&
			throwHttpError(400, 'Bad request: password is incorrect');

		const { password, ...userResponse } =
			dbUser.dataValues as ValidateUserLogin;

		return userResponse;
	}

	async create(createUserDto: CreateUserDto) {
		const hashPassword = await this.hashPassword(createUserDto.password);

		const newUser = await this.userService.create({
			...createUserDto,
			password: hashPassword
		});

		const { password, ...userData } = newUser.dataValues;

		return {
			success: true,
			message: 'The user has been successfully register',
			data: userData
		};
	}

	async login(user: Omit<ValidateUserLogin, 'password'>) {
		const { id, firstname, lastname } = user;

		const userPayload = {
			id,
			firstname,
			lastname
		};

		const token = await this.generateToken(userPayload);

		return {
			success: true,
			message: 'The user has been successfully login',
			data: {
				userPayload,
				token
			}
		};
	}

	private async comparePassword(
		candidatePassword: string,
		dbUserPassword: string
	): Promise<boolean> {
		return bcrypt.compare(candidatePassword, dbUserPassword);
	}

	private async hashPassword(candidatePassword: string) {
		const SALT_ROUNDS = 10;
		const salt = await bcrypt.genSalt(SALT_ROUNDS);

		return bcrypt.hash(candidatePassword, salt);
	}

	private async generateToken(userPayload): Promise<string> {
		return this.jwtService.signAsync(userPayload, {
			expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
		});
	}
}
