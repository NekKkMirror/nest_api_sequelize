import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
	@ApiProperty({
		description: 'UserLoginDto email',
		required: true,
		type: String
	})
	readonly email: string;

	@ApiProperty({
		description: 'UserLoginDto password',
		required: true,
		type: String
	})
	readonly password: string;
}
