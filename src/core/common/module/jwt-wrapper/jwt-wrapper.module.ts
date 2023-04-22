import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtWrapperService } from './jwt-wrapper.service';
import { ClientModule } from '../client/client.module';

@Module({
	imports: [
		ClientModule,
		JwtModule.register({
			secret: process.env.JWTKEY
		})
	],
	providers: [JwtWrapperService],
	exports: [JwtWrapperService]
})
export class JwtWrapperModule {}
