-- ============================================================
-- AppDrop — Initial Schema
-- ============================================================

create extension if not exists "pgcrypto";

-- ── Enums ────────────────────────────────────────────────────
create type project_status as enum ('VOTING', 'FUNDING', 'IN_DEV', 'BETA', 'LIVE');
create type vote_direction as enum ('up', 'down');
create type pledge_status as enum ('pending', 'confirmed', 'refunded');

-- ── Profiles ─────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name text not null,
  avatar_color text not null default '#00D4FF',
  initials text not null default 'U',
  reputation integer not null default 0,
  total_submitted integer not null default 0,
  total_backed integer not null default 0,
  total_votes integer not null default 0,
  total_funded integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "Public profiles viewable by everyone" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, name, initials)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'user_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    upper(left(coalesce(new.raw_user_meta_data->>'full_name', new.email), 2))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Developers ───────────────────────────────────────────────
create table public.developers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  tagline text not null default '',
  skills text[] not null default '{}',
  hourly_rate integer not null default 0,
  rating numeric(3,2) not null default 5.0,
  review_count integer not null default 0,
  completed_projects integer not null default 0,
  available boolean not null default true,
  avatar_color text not null default '#00D4FF',
  initials text not null default 'D',
  portfolio_items jsonb not null default '[]',
  created_at timestamptz not null default now()
);

alter table public.developers enable row level security;
create policy "Developers viewable by everyone" on public.developers for select using (true);
create index developers_available_idx on public.developers(available);
create index developers_rating_idx on public.developers(rating desc);

-- ── Ideas ────────────────────────────────────────────────────
create table public.ideas (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tagline text not null default '',
  description text not null default '',
  problem text not null default '',
  category text not null,
  status project_status not null default 'VOTING',
  upvotes integer not null default 0,
  downvotes integer not null default 0,
  funding_goal integer not null default 10000,
  funding_current integer not null default 0,
  backer_count integer not null default 0,
  tags text[] not null default '{}',
  features text[] not null default '{}',
  target_audience text not null default '',
  monetization text not null default '',
  creator_id uuid references public.profiles(id) on delete set null,
  developer_id uuid references public.developers(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.ideas enable row level security;
create policy "Ideas viewable by everyone" on public.ideas for select using (true);
create policy "Authenticated users can submit" on public.ideas for insert with check (auth.uid() is not null);
create policy "Creators can update own ideas" on public.ideas for update using (auth.uid() = creator_id);
create index ideas_category_idx on public.ideas(category);
create index ideas_status_idx on public.ideas(status);
create index ideas_upvotes_idx on public.ideas(upvotes desc);
create index ideas_created_at_idx on public.ideas(created_at desc);

-- ── Milestones ───────────────────────────────────────────────
create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  title text not null,
  description text not null default '',
  due_date date not null,
  completed boolean not null default false,
  payout_amount integer not null default 0,
  order_index integer not null default 0
);

alter table public.milestones enable row level security;
create policy "Milestones viewable by everyone" on public.milestones for select using (true);
create index milestones_idea_idx on public.milestones(idea_id, order_index);

-- ── Votes ─────────────────────────────────────────────────────
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  direction vote_direction not null,
  created_at timestamptz not null default now(),
  unique(idea_id, user_id)
);

alter table public.votes enable row level security;
create policy "Users see own votes" on public.votes for select using (auth.uid() = user_id);
create policy "Authenticated users can vote" on public.votes for insert with check (auth.uid() = user_id);
create policy "Users can change their vote" on public.votes for update using (auth.uid() = user_id);

create or replace function public.update_vote_counts()
returns trigger language plpgsql security definer as $$
declare
  v_up integer;
  v_down integer;
  v_idea_id uuid;
begin
  v_idea_id := coalesce(new.idea_id, old.idea_id);
  select
    count(*) filter (where direction = 'up'),
    count(*) filter (where direction = 'down')
  into v_up, v_down
  from public.votes where idea_id = v_idea_id;
  update public.ideas set upvotes = v_up, downvotes = v_down where id = v_idea_id;
  return coalesce(new, old);
end;
$$;

create trigger on_vote_change
  after insert or update or delete on public.votes
  for each row execute function public.update_vote_counts();

-- ── Pledges ──────────────────────────────────────────────────
create table public.pledges (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null check (amount > 0),
  status pledge_status not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.pledges enable row level security;
create policy "Users see own pledges" on public.pledges for select using (auth.uid() = user_id);
create policy "Authenticated users can pledge" on public.pledges for insert with check (auth.uid() = user_id);

create or replace function public.update_funding_totals()
returns trigger language plpgsql security definer as $$
declare
  v_total integer;
  v_backers integer;
  v_idea_id uuid;
begin
  v_idea_id := coalesce(new.idea_id, old.idea_id);
  select coalesce(sum(amount), 0), count(distinct user_id)
  into v_total, v_backers
  from public.pledges where idea_id = v_idea_id and status != 'refunded';
  update public.ideas set funding_current = v_total, backer_count = v_backers where id = v_idea_id;
  return coalesce(new, old);
end;
$$;

create trigger on_pledge_change
  after insert or update or delete on public.pledges
  for each row execute function public.update_funding_totals();

-- ── Comments ─────────────────────────────────────────────────
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  idea_id uuid not null references public.ideas(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  likes integer not null default 0,
  avatar_color text not null default '#00D4FF',
  initials text not null default 'U',
  author text not null default 'Anonymous',
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;
create policy "Comments viewable by everyone" on public.comments for select using (true);
create policy "Authenticated users can comment" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users can edit own comments" on public.comments for update using (auth.uid() = user_id);
create index comments_idea_idx on public.comments(idea_id, created_at desc);
