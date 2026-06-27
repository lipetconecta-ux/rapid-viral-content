
-- Move SECURITY DEFINER functions out of the PostgREST-exposed `public` schema
-- so they cannot be executed by anon/authenticated via the Data API.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO service_role;

-- Drop public versions
DROP FUNCTION IF EXISTS public.consume_credit();
DROP FUNCTION IF EXISTS public.upgrade_to_pro();

-- Recreate in `private` schema, accepting user id as explicit arg (the
-- server function passes the authenticated userId from the verified JWT).
CREATE OR REPLACE FUNCTION private.consume_credit(_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_pro boolean;
  updated_rows int;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'NOT_AUTHENTICATED';
  END IF;

  SELECT (plan = 'pro') INTO is_pro
  FROM public.subscriptions
  WHERE user_id = _user_id;

  IF COALESCE(is_pro, false) THEN
    RETURN true;
  END IF;

  UPDATE public.credits
     SET remaining = remaining - 1,
         updated_at = now()
   WHERE user_id = _user_id
     AND remaining > 0;

  GET DIAGNOSTICS updated_rows = ROW_COUNT;
  IF updated_rows = 0 THEN
    RAISE EXCEPTION 'CREDITS_EXHAUSTED';
  END IF;

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION private.upgrade_to_pro(_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'NOT_AUTHENTICATED';
  END IF;

  UPDATE public.subscriptions
     SET plan = 'pro',
         status = 'active',
         current_period_start = now(),
         current_period_end = now() + interval '30 days',
         updated_at = now()
   WHERE user_id = _user_id;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION private.consume_credit(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION private.upgrade_to_pro(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.consume_credit(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION private.upgrade_to_pro(uuid) TO service_role;
