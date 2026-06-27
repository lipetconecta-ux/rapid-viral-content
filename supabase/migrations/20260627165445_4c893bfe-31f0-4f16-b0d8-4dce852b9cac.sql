GRANT USAGE ON SCHEMA private TO service_role;
GRANT USAGE ON SCHEMA private TO authenticator;

REVOKE ALL ON FUNCTION private.consume_credit(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.upgrade_to_pro(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.consume_credit(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION private.upgrade_to_pro(uuid) TO service_role;

NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';