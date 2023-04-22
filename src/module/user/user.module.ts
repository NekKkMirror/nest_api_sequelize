import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './provider/user.providers';

@Module({
	providers: [UserService, ...userProviders],
	exports: [UserService]
})
export class UserModule {}
