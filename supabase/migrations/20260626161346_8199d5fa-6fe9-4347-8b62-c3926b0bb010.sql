
-- Remove direct UPDATE access on credits and subscriptions to prevent privilege escalation
DROP POLICY IF EXISTS credits_update_own ON public.credits;
DROP POLICY IF EXISTS subscriptions_update_own ON public.subscriptions;
REVOKE UPDATE ON public.credits FROM authenticated, anon;
REVOKE UPDATE ON public.subscriptions FROM authenticated, anon;

-- SECURITY DEFINER function: atomically consume one credit for caller (no-op for pro)
CREATE OR REPLACE FUNCTION public.consume_credit()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  is_pro boolean;
  updated_rows int;
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'NOT_AUTHENTICATED';
  END IF;

  SELECT (plan = 'pro') INTO is_pro
  FROM public.subscriptions
  WHERE user_id = uid;

  IF COALESCE(is_pro, false) THEN
    RETURN true;
  END IF;

  UPDATE public.credits
     SET remaining = remaining - 1,
         updated_at = now()
   WHERE user_id = uid
     AND remaining > 0;

  GET DIAGNOSTICS updated_rows = ROW_COUNT;
  IF updated_rows = 0 THEN
    RAISE EXCEPTION 'CREDITS_EXHAUSTED';
  END IF;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_credit() FROM public;
GRANT EXECUTE ON FUNCTION public.consume_credit() TO authenticated;

-- SECURITY DEFINER function: upgrade caller to pro (placeholder for payment integration)
CREATE OR REPLACE FUNCTION public.upgrade_to_pro()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN
    RAISE EXCEPTION 'NOT_AUTHENTICATED';
  END IF;

  UPDATE public.subscriptions
     SET plan = 'pro',
         status = 'active',
         current_period_start = now(),
         current_period_end = now() + interval '30 days',
         updated_at = now()
   WHERE user_id = uid;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.upgrade_to_pro() FROM public;
GRANT EXECUTE ON FUNCTION public.upgrade_to_pro() TO authenticated;
