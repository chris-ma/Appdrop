-- Add Stripe session tracking to pledges
alter table public.pledges add column if not exists stripe_session_id text;
