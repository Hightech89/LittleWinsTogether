create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_choice text,
  bio text,
  general_location text,
  profile_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_required_when_complete check (
    profile_completed = false
    or nullif(btrim(display_name), '') is not null
  ),
  constraint profiles_display_name_length check (
    display_name is null
    or char_length(display_name) <= 80
  ),
  constraint profiles_bio_length check (
    bio is null
    or char_length(bio) <= 240
  ),
  constraint profiles_general_location_length check (
    general_location is null
    or char_length(general_location) <= 120
  )
);

alter table public.profiles enable row level security;

create policy "Profiles are visible to everyone"
  on public.profiles
  for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists create_profile_after_user_signup on auth.users;

create trigger create_profile_after_user_signup
  after insert on auth.users
  for each row
  execute function public.create_profile_for_new_user();
