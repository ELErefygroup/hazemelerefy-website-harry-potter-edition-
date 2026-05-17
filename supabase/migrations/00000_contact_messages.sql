-- =====================================================
-- FULL SCHEMA for hazemelerefy website (harry potter edition)
-- =====================================================

-- 1. Contact Messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    service_type text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on contact_messages" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated reads on contact_messages" ON public.contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

-- 2. Project Ratings table
CREATE TABLE IF NOT EXISTS public.project_ratings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    project_key text NOT NULL,
    score integer NOT NULL CHECK (score >= 1 AND score <= 5),
    visitor_id text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(project_key, visitor_id)
);

ALTER TABLE public.project_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts on project_ratings" ON public.project_ratings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads on project_ratings" ON public.project_ratings
    FOR SELECT USING (true);

CREATE POLICY "Allow public updates on project_ratings" ON public.project_ratings
    FOR UPDATE USING (true) WITH CHECK (true);

-- 3. Aggregated ratings view for fast reads
CREATE OR REPLACE VIEW public.project_ratings_summary AS
SELECT
    project_key,
    COUNT(*)::integer AS total_votes,
    ROUND(AVG(score)::numeric, 1)::float AS average
FROM public.project_ratings
GROUP BY project_key;
