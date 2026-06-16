-- Feature: Project pitch media (video, screenshot gallery, pitch deck)

alter table public.ideas
  add column if not exists video_url text,
  add column if not exists images text[] not null default '{}',
  add column if not exists pitch_deck_url text;
