-- ── Bid Requests ─────────────────────────────────────────────
create table public.bid_requests (
  id uuid primary key default gen_random_uuid(),
  developer_id uuid not null references public.developers(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  idea_id uuid references public.ideas(id) on delete set null,
  message text not null default '',
  budget text not null default '',
  timeline text not null default '',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now()
);

alter table public.bid_requests enable row level security;
create policy "Users see own bid requests" on public.bid_requests for select using (auth.uid() = user_id);
create policy "Authenticated users can request bids" on public.bid_requests for insert with check (auth.uid() = user_id);
create index bid_requests_developer_idx on public.bid_requests(developer_id);
create index bid_requests_user_idx on public.bid_requests(user_id);
