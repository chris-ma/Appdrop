-- Waitlist signups table
create table public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now(),
  unique (idea_id, email)
);

alter table public.waitlist_signups enable row level security;

create policy "Anyone can join waitlist" on public.waitlist_signups
  for insert with check (true);

create policy "Creators can view their waitlists" on public.waitlist_signups
  for select using (
    exists (select 1 from public.ideas where id = idea_id and creator_id = auth.uid())
  );

-- Counter column on ideas
alter table public.ideas
  add column if not exists waitlist_count integer not null default 0;

-- RPC to safely increment the counter
create or replace function increment_waitlist(idea_id uuid)
returns void language sql security definer as $$
  update public.ideas set waitlist_count = waitlist_count + 1 where id = idea_id;
$$;
