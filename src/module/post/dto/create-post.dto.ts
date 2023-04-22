import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
	@ApiProperty({
		description: 'CreatePostDto title',
		required: true,
		type: String
	})
	@IsDefined()
	@IsString()
	@IsNotEmpty({})
	@MinLength(4)
	readonly title: string;

	@ApiProperty({
		description: 'CreatePostDto body',
		required: true,
		type: String
	})
	@IsDefined()
	@IsString()
	@IsNotEmpty({})
	body: string;
}
