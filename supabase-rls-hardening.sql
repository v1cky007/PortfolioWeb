-- ============================================================
-- RLS hardening for the portfolio database.
-- NOT applied automatically. Review, then run in the Supabase SQL Editor.
--
-- Effect: anonymous (anon key) visitors can only READ posts and
-- INSERT page views. Only a signed-in Supabase user (role
-- "authenticated") can create, edit, or delete posts.
--
-- IMPORTANT: this only works once the admin login uses Supabase Auth
-- (the current client-side password check does not create a Supabase
-- session, so the admin editor would be blocked by these policies).
-- Run this after the admin login is migrated.
-- ============================================================

-- Remove the permissive policy that lets anyone modify posts
DROP POLICY IF EXISTS "Authenticated can manage posts" ON posts;

-- Only signed-in users may write posts
CREATE POLICY "Authenticated users can insert posts" ON posts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts" ON posts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete posts" ON posts
  FOR DELETE TO authenticated USING (true);

-- Public read and view-recording policies stay as they are:
--   "Public can read posts"  (SELECT, anon + authenticated)
--   "Public can insert views" (INSERT on page_views)
--   "Public can read views"  (SELECT on page_views)
