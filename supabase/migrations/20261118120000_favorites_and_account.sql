-- VenusUI accounts: favourites and self-service account deletion.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- Safe to run again: every statement checks before creating.

-- Favourites ---------------------------------------------------------------

create table if not exists public.favorites (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  -- Registry item names look like "shimmer-button" or "hero-08".
  item_name text not null check (item_name ~ '^[a-z0-9][a-z0-9-]{0,99}$'),
  created_at timestamptz not null default now(),
  primary key (user_id, item_name)
);

comment on table public.favorites is 'Components, blocks and templates a user saved on VenusUI.';

-- Row Level Security: nobody can read or change anyone else's rows. Signed-out
-- visitors (the anon role) get no access at all.
alter table public.favorites enable row level security;

drop policy if exists "Users read their own favorites" on public.favorites;
create policy "Users read their own favorites" on public.favorites
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Users add their own favorites" on public.favorites;
create policy "Users add their own favorites" on public.favorites
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Users remove their own favorites" on public.favorites;
create policy "Users remove their own favorites" on public.favorites
  for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.favorites from anon;
grant select, insert, delete on public.favorites to authenticated;

-- A ceiling so one account can't fill the database.
create or replace function public.favorites_limit() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (select count(*) from public.favorites where user_id = new.user_id) >= 500 then
    raise exception 'favorites limit reached (500)';
  end if;
  return new;
end;
$$;

drop trigger if exists favorites_limit on public.favorites;
create trigger favorites_limit before insert on public.favorites
  for each row execute function public.favorites_limit();

-- Delete my account -------------------------------------------------------

-- Runs with the owner's rights (security definer) but can only ever delete the
-- caller: auth.uid() comes from their verified token. Favourites go with the
-- account (on delete cascade). No secret key is needed in the app.
create or replace function public.delete_account() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke execute on function public.delete_account() from public, anon;
grant execute on function public.delete_account() to authenticated;
