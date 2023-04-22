import { PostEntity } from '../entity';
import { POST_REPOSITORY } from '../../../core/constants';

export const postProviders = [
	{
		provide: POST_REPOSITORY,
		useValue: PostEntity
	}
];
