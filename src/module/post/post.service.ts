import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from '../../core/constants';
import { PostEntity } from './entity';
import { CreatePostDto } from './dto';
import { UserEntity } from '../user/entity';
import { v4 } from 'uuid';

@Injectable()
export class PostService {
	constructor(
		@Inject(POST_REPOSITORY) private readonly postRepository: typeof PostEntity
	) {}

	async create(post: CreatePostDto, userId: string): Promise<PostEntity> {
		const id = v4();

		return this.postRepository.create<PostEntity>({ ...post, id, userId });
	}

	async findAll(): Promise<PostEntity[]> {
		return this.postRepository.findAll<PostEntity>({
			include: [
				{
					model: UserEntity,
					attributes: {
						exclude: ['password']
					}
				}
			]
		});
	}

	async findOneById(id: string): Promise<PostEntity> {
		return this.postRepository.findOne({
			where: { id },
			include: [
				{
					model: UserEntity,
					attributes: {
						exclude: ['password']
					}
				}
			]
		});
	}

	async delete(id: string, userId: string) {
		return this.postRepository.destroy({
			where: {
				id,
				userId
			}
		});
	}

	// todo: updatePostDto
	async update(id: string, data, userId: string) {
		const [numberOfAffectedRows, [updatedRows]] =
			await this.postRepository.update(
				{ ...data },
				{ where: { id, userId }, returning: true }
			);

		return {
			numberOfAffectedRows,
			updatedRows
		};
	}
}
