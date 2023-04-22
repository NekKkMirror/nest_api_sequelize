import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postProviders } from './provider/post.provider';

@Module({
	controllers: [PostController],
	providers: [PostService, ...postProviders]
})
export class PostModule {}
