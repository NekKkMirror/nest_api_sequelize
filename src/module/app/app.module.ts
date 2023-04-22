import { Module } from '@nestjs/common';
import { CatModule } from '../cat/cat.module';
import { SequelizePgDbModule } from '../../core/database/postgres/sequelizePgDatabase/sequelize-pgdb.module';
import { AuthModule } from '../auth/auth.module';
import { PostModule } from '../post/post.module';

@Module({
	imports: [SequelizePgDbModule, AuthModule, CatModule, PostModule],
	controllers: [],
	providers: []
})
export class AppModule {}
