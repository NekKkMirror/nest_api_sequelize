import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UseFilters,
	UseGuards,
	Request,
	Put
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../core/common/exception/exception.filter';
import { PostService } from './post.service';
import { PostEntity } from './entity';
import { throwHttpError } from '../../core/common/utils/throw-httpError.util';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto, UpdatePostDto } from './dto';

@ApiTags('post')
@Controller('post')
@UseFilters(HttpExceptionFilter)
export class PostController {
	constructor(private readonly postService: PostService) {}

	@ApiOperation({ description: 'Find all posts' })
	@ApiCreatedResponse({
		description: 'All posts found successfully'
	})
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Server error' })
	@Get()
	async findAll(@Param('id') id: string): Promise<PostEntity[]> {
		return this.postService.findAll();
	}

	@ApiOperation({ description: 'search for a single post' })
	@ApiCreatedResponse({
		description: 'All posts found successfully'
	})
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Server error' })
	@Get(':id')
	async findOne(@Param('id') id: string): Promise<PostEntity> {
		const post = await this.postService.findOneById(id);

		!post && throwHttpError(404, "This post doesn't exist");

		return post;
	}

	@ApiOperation({ description: 'Create post' })
	@ApiCreatedResponse({
		description: 'Post has been successfully created'
	})
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiForbiddenResponse({ description: 'Log in to your account' })
	@ApiInternalServerErrorResponse({ description: 'Server error' })
	@ApiBody({
		description: 'The create post dto',
		required: true,
		type: CreatePostDto
	})
	@UseGuards(AuthGuard('jwt'))
	@Post()
	async create(
		@Body() createPostDto: CreatePostDto,
		@Request() req
	): Promise<PostEntity> {
		return this.postService.create(createPostDto, req.user.id);
	}

	@ApiOperation({ description: 'Update post' })
	@ApiCreatedResponse({
		description: 'Post has been successfully updated'
	})
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiForbiddenResponse({ description: 'Log in to your account' })
	@ApiInternalServerErrorResponse({ description: 'Server error' })
	@ApiBody({
		description: 'The update post dto',
		required: true,
		type: UpdatePostDto
	})
	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() updatePostDto: UpdatePostDto,
		@Request() req
	): Promise<PostEntity> {
		const { numberOfAffectedRows, updatedRows } = await this.postService.update(
			id,
			updatePostDto,
			req.user.id
		);

		numberOfAffectedRows === 0 &&
			throwHttpError(404, "This Post doesn't exist");

		return updatedRows;
	}

	@ApiOperation({ description: 'Delete post' })
	@ApiCreatedResponse({
		description: 'Post has been successfully deleted'
	})
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiForbiddenResponse({ description: 'Log in to your account' })
	@ApiInternalServerErrorResponse({ description: 'Server error' })
	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
	async remove(@Param('id') id: string, @Request() req): Promise<string> {
		const deleted = await this.postService.delete(id, req.user.id);

		deleted === 0 && throwHttpError(404, "This Post doesn't exist");

		return 'Successfully deleted';
	}
}
