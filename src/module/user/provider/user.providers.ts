import { UserEntity } from '../entity';
import { USER_REPOSITORY } from '../../../core/constants';

export const userProviders = [
	{
		provide: USER_REPOSITORY,
		useValue: UserEntity
	}
];
