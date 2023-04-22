import * as dotenv from 'dotenv';
import * as path from 'node:path';

dotenv.config({
	path: path.resolve(path.join(process.cwd()), 'src/core/config/env/dev.env')
});

export const SEQUELIZE_POSTGRES_CONFIG = {
	development: {
		dialect: process.env.DB_DIALECT,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME_DEVELOPMENT,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	},
	test: {
		dialect: process.env.DB_DIALECT,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME_DEVELOPMENT,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	},
	production: {
		dialect: process.env.DB_DIALECT,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME_DEVELOPMENT,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	}
};
