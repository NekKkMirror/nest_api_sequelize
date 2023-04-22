import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interface/payload.interface';

@Injectable()
export class JwtWrapperService {
	constructor(private readonly jwtService: JwtService) {}

	async generateToken(payload: Payload): Promise<string> {
		return this.jwtService.signAsync(payload, {
			secret: String(process.env.JWTKEY)
		});
	}

	async verifyToken(token: string): Promise<object> {
		return this.jwtService.verifyAsync(token, {
			secret: String(process.env.JWTKEY)
		});
	}
}
