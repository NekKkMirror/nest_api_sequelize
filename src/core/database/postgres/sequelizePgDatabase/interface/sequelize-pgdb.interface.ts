export interface DatabaseConfigAttributes {
	host?: string;
	port?: number;
	username?: string;
	password?: string;
	database?: string;
	dialect?: string;
}

export interface DatabaseConfig {
	development: DatabaseConfigAttributes;
	test: DatabaseConfigAttributes;
	production: DatabaseConfigAttributes;
}
