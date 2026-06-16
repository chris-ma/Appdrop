-- ── Project Updates ───────────────────────────────────────────
create table public.project_updates (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.project_updates enable row level security;
create policy "Updates viewable by everyone" on public.project_updates for select using (true);
create policy "Authenticated users can post updates" on public.project_updates for insert with check (auth.uid() = user_id);
create index project_updates_idea_idx on public.project_updates(idea_id, created_at desc);

alter publication supabase_realtime add table public.project_updates;
