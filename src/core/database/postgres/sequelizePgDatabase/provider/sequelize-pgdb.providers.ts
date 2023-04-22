import {
	SEQUELIZE,
	DEVELOPMENT,
	TEST,
	PRODUCTION
} from '../../../../constants';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE_POSTGRES_CONFIG } from '../../../../config/database/postgres/postgres.config';
import { UserEntity } from '../../../../../module/user/entity';
import { PostEntity } from '../../../../../module/post/entity';

export const sequelizePostgresDbProviders = [
	{
		provide: SEQUELIZE,
		useFactory: async () => {
			let config;

			switch (process.env.NODE_ENV) {
				case DEVELOPMENT:
					config = SEQUELIZE_POSTGRES_CONFIG.development;
					break;

				case TEST:
					config = SEQUELIZE_POSTGRES_CONFIG.test;
					break;

				case PRODUCTION:
					config = SEQUELIZE_POSTGRES_CONFIG.production;
					break;

				default:
					config = SEQUELIZE_POSTGRES_CONFIG.development;
			}
			console.log(config);
			const sequelize = new Sequelize(config);
			sequelize.addModels([UserEntity, PostEntity]);

			await sequelize.sync();

			return sequelize;
		}
	}
];
