import {
	IsDefined,
	IsEmail,
	IsEnum,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	Length
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum Gender {
	MALE = 'male',
	FEMALE = 'female'
}

export class CreateUserDto {
	@ApiProperty({
		description: 'CreateUserDto firstname',
		required: true,
		type: String
	})
	@IsDefined()
	@IsString()
	@IsNotEmpty({})
	@Length(2, 10)
	readonly firstname: string;

	@ApiProperty({
		description: 'CreateUserDto lastname',
		required: true,
		type: String
	})
	@IsDefined()
	@IsString()
	@IsNotEmpty({})
	@Length(2, 10)
	readonly lastname: string;

	@ApiProperty({
		description: 'CreateUserDto email',
		required: true,
		type: String
	})
	@IsDefined()
	@IsString()
	@IsNotEmpty({})
	@IsEmail()
	readonly email: string;

	@ApiProperty({
		description: 'CreateUserDto password',
		required: true,
		type: String
	})
	@IsDefined()
	@IsString()
	@IsNotEmpty({})
	@IsStrongPassword(
		{
			minLowercase: 3,
			minUppercase: 2,
			minSymbols: 2,
			minLength: 12,
			minNumbers: 5
		},
		{
			message: `
			Weak password!
			Password requirements:
				min lowercase: 3,
				min uppercase: 2,
				min symbols: 5,
				min length: 10,
				min numbers: 5
			`
		}
	)
	readonly password: string;

	@ApiProperty({
		description: 'CreateUserDto gender',
		required: true,
		type: Gender,
		enum: Gender,
		enumName: 'Gender'
	})
	@IsDefined()
	@IsNotEmpty()
	@IsEnum(Gender, {
		message: 'Gender must be either male or female'
	})
	readonly gender: Gender;
}
