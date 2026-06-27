
ALTER ROLE authenticator SET pgrst.db_schemas TO 'public, private';
GRANT USAGE ON SCHEMA private TO authenticator;
NOTIFY pgrst, 'reload config';
