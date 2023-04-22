import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../core/constants';
import { UserEntity } from './entity';
import { CreateUserDto } from '../auth/dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
	constructor(
		@Inject(USER_REPOSITORY) private readonly userRepository: typeof UserEntity
	) {}

	async create(createUserDto: CreateUserDto): Promise<UserEntity> {
		const id = v4();

		return this.userRepository.create<UserEntity>({ ...createUserDto, id });
	}

	async findOneByEmail(email: string): Promise<UserEntity> {
		return this.userRepository.findOne<UserEntity>({ where: { email } });
	}

	async findOneById(id: number): Promise<UserEntity> {
		return this.userRepository.findOne<UserEntity>({ where: { id } });
	}
}
