import {
	Table,
	Column,
	Model,
	DataType,
	NotEmpty,
	NotNull,
	Length,
	IsUUID,
	ForeignKey,
	BelongsTo
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entity';

@Table({
	modelName: 'post',
	tableName: 'posts'
})
export class PostEntity extends Model<PostEntity> {
	@NotNull
	@NotEmpty
	@IsUUID('4')
	@Column({
		comment: 'Post id',
		type: DataType.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true
	})
	id: string;

	@NotNull
	@NotEmpty
	@Length({ min: 2 })
	@Column({
		comment: 'Post title',
		type: DataType.STRING,
		allowNull: false
	})
	title: string;

	@NotNull
	@NotEmpty
	@Column({
		comment: 'Post body',
		type: DataType.STRING,
		allowNull: false
	})
	body: string;

	@NotNull
	@NotEmpty
	@IsUUID('4')
	@ForeignKey(() => UserEntity)
	@Column({
		comment: 'User id',
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	userId: string;

	@BelongsTo(() => UserEntity)
	user: UserEntity;
}
