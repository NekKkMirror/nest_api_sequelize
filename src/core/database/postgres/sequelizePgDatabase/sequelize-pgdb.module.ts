import { Module } from '@nestjs/common';
import { sequelizePostgresDbProviders } from './provider';

@Module({
	providers: [...sequelizePostgresDbProviders],
	exports: [...sequelizePostgresDbProviders]
})
export class SequelizePgDbModule {}
