import {
	Table,
	Column,
	Model,
	DataType,
	NotEmpty,
	NotNull,
	IsEmail,
	Length,
	IsUUID,
	Min,
	HasMany
} from 'sequelize-typescript';
import { PostEntity } from '../../post/entity';

@Table({
	modelName: 'user',
	tableName: 'users'
})
export class UserEntity extends Model<UserEntity> {
	@NotNull
	@NotEmpty
	@IsUUID('4')
	@Column({
		comment: 'User id',
		type: DataType.STRING,
		allowNull: false,
		unique: true,
		primaryKey: true
	})
	id: string;

	@NotNull
	@NotEmpty
	@Length({
		min: 2,
		max: 10
	})
	@Column({
		comment: 'User firstname',
		type: DataType.STRING,
		allowNull: false
	})
	firstname: string;

	@NotNull
	@NotEmpty
	@Length({
		min: 2,
		max: 10
	})
	@Column({
		comment: 'User lastname',
		type: DataType.STRING,
		allowNull: false
	})
	lastname: string;

	@NotNull
	@NotEmpty
	@IsEmail
	@Column({
		comment: 'User email',
		type: DataType.STRING,
		allowNull: false
	})
	email: string;

	@NotNull
	@NotEmpty
	@Min(10)
	@Column({
		comment: 'User password',
		type: DataType.STRING,
		allowNull: false
	})
	password: string;

	@NotNull
	@NotEmpty
	@Column({
		comment: 'User gender',
		type: DataType.ENUM,
		values: ['male', 'female'],
		allowNull: false
	})
	gender: string;

	@HasMany(() => PostEntity)
	posts: PostEntity[];
}
