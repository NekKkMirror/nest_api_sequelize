import {
	Body,
	Controller,
	Post,
	UseFilters,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UserLoginDto } from './dto';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { DoesUserExistGuard } from '../../core/common/guards/doesUserExist.guard';
import { HttpExceptionFilter } from '../../core/common/exception/exception.filter';
import { LocalAuthGuard } from './guard';

@ApiTags('auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ description: 'Register new User' })
	@ApiCreatedResponse({
		description: 'User has been successfully register'
	})
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiForbiddenResponse({ description: 'Email already exist' })
	@ApiInternalServerErrorResponse({ description: 'Server error' })
	@ApiBody({ description: 'The user dto', required: true, type: CreateUserDto })
	@Post('signup')
	@UseGuards(DoesUserExistGuard)
	@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
	async signUp(
		@Body()
		createUserDto: CreateUserDto
	) {
		return {
			status: 'CREATED',
			...(await this.authService.create(createUserDto))
		};
	}

	@ApiOperation({ description: 'Login' })
	@ApiCreatedResponse({
		description: 'User has been successfully login'
	})
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiUnauthorizedResponse({ description: 'Wrong credentials' })
	@ApiInternalServerErrorResponse({ description: 'Server error' })
	@ApiBody({
		description: 'The login dto',
		required: true,
		type: UserLoginDto
	})
	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login(@Request() req) {
		return {
			status: 'OK',
			...(await this.authService.login(req.user))
		};
	}
}
