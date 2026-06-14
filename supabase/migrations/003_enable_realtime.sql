-- Enable Supabase Realtime postgres_changes for live updates
alter publication supabase_realtime add table public.ideas;
alter publication supabase_realtime add table public.comments;
alter publication supabase_realtime add table public.votes;
