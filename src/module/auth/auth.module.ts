import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
	imports: [
		PassportModule,
		UserModule,
		JwtModule.register({
			secret: process.env.JWTKEY
		})
	],
	controllers: [AuthController],
	providers: [LocalStrategy, AuthService, JwtStrategy]
})
export class AuthModule {}
