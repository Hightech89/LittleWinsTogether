create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade
);

alter table public.profiles
  add column if not exists display_name text,
  add column if not exists username text,
  add column if not exists avatar_key text,
  add column if not exists avatar_url text,
  add column if not exists bio text,
  add column if not exists general_location text,
  add column if not exists profile_completed boolean,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

update public.profiles
set
  display_name = coalesce(display_name, ''),
  profile_completed = coalesce(profile_completed, false),
  created_at = coalesce(created_at, now()),
  updated_at = coalesce(updated_at, now());

alter table public.profiles
  alter column display_name set default '',
  alter column display_name set not null,
  alter column profile_completed set default false,
  alter column profile_completed set not null,
  alter column created_at set default now(),
  alter column created_at set not null,
  alter column updated_at set default now(),
  alter column updated_at set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_display_name_required_when_complete'
  ) then
    alter table public.profiles
      add constraint profiles_display_name_required_when_complete check (
        profile_completed = false
        or nullif(btrim(display_name), '') is not null
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_username_required_when_complete'
  ) then
    alter table public.profiles
      add constraint profiles_username_required_when_complete check (
        profile_completed = false
        or nullif(btrim(username), '') is not null
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_display_name_length'
  ) then
    alter table public.profiles
      add constraint profiles_display_name_length check (char_length(display_name) <= 80);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_username_format'
  ) then
    alter table public.profiles
      add constraint profiles_username_format check (
        username is null
        or username ~ '^[a-z0-9_]{3,30}$'
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_bio_length'
  ) then
    alter table public.profiles
      add constraint profiles_bio_length check (
        bio is null
        or char_length(bio) <= 240
      );
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_general_location_length'
  ) then
    alter table public.profiles
      add constraint profiles_general_location_length check (
        general_location is null
        or char_length(general_location) <= 120
      );
  end if;
end;
$$;

create unique index if not exists profiles_username_unique_idx
  on public.profiles (lower(username))
  where username is not null;

alter table public.profiles enable row level security;

grant select on public.profiles to anon;
grant select, insert, update on public.profiles to authenticated;

drop policy if exists "Profiles are visible to everyone" on public.profiles;
drop policy if exists "Anyone can read public profile fields" on public.profiles;
drop policy if exists "Users can insert their own profile" on public.profiles;
drop policy if exists "Authenticated users can insert their own profile" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Authenticated users can update their own profile" on public.profiles;

create policy "Anyone can read public profile fields"
  on public.profiles
  for select
  using (true);

create policy "Authenticated users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Authenticated users can update their own profile"
  on public.profiles
  for update
  to authenticated
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
