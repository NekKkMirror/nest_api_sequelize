#!/bin/bash

set -e
set -u

function create_user_and_database() {
	local database=$1

	echo " Create user and database '$database'"

	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
		CREATE USER $database
		CREATE DATABASE $database
		GRANT ALL PRIVILEGES ON DATABASE $database to $database;
	EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	echo "Multiple database creation request: $POSTGRES_MULTIPLE_DATABASES"
	for db in $(echo "$POSTGRES_MULTIPLE_DATABASES" | tr ',' ' '); do
		create_user_and_database "$db"
	done

	echo "Multiple databases created"
fi
