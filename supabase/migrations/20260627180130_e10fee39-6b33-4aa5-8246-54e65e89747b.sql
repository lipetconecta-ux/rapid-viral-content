-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_roles_select_own ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin credit adjustment (privileged, lives in private schema)
CREATE OR REPLACE FUNCTION private.admin_set_credits(_user_id uuid, _remaining integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_remaining integer;
BEGIN
  IF _remaining < 0 THEN
    RAISE EXCEPTION 'remaining must be >= 0';
  END IF;

  INSERT INTO public.credits (user_id, remaining)
  VALUES (_user_id, _remaining)
  ON CONFLICT (user_id) DO UPDATE
    SET remaining = EXCLUDED.remaining,
        updated_at = now()
  RETURNING remaining INTO new_remaining;

  RETURN new_remaining;
END;
$$;

REVOKE ALL ON FUNCTION private.admin_set_credits(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.admin_set_credits(uuid, integer) TO service_role;
