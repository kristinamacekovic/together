CREATE TABLE public.focus_sessions (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    user_id uuid NOT NULL,
    conversation_id text NOT NULL,
    conversation_url text,
    conversation_name text,
    replica_id text,
    persona_id text,
    status text,
    requested_session_length integer,
    CONSTRAINT focus_sessions_pkey PRIMARY KEY (id),
    CONSTRAINT focus_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to view their own sessions" ON public.focus_sessions
AS PERMISSIVE FOR SELECT
TO authenticated
USING (auth.uid() = user_id); 