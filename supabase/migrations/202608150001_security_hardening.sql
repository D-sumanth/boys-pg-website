begin;

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and is_active = true
      and role in ('Owner', 'Manager', 'Viewer')
  );
$$;

create or replace function private.is_admin_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and is_active = true
      and role in ('Owner', 'Manager')
  );
$$;

create or replace function private.is_admin_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and is_active = true
      and role = 'Owner'
  );
$$;

revoke all on function private.is_admin_user() from public, anon;
revoke all on function private.is_admin_editor() from public, anon;
revoke all on function private.is_admin_owner() from public, anon;
grant execute on function private.is_admin_user() to authenticated;
grant execute on function private.is_admin_editor() to authenticated;
grant execute on function private.is_admin_owner() to authenticated;

do $$
declare
  target_table text;
begin
  foreach target_table in array array[
    'profiles','hostels','room_types','rooms','beds','residents','resident_occupancy',
    'rent_invoices','payments','deposits','expense_categories','expenses','enquiries','activity_logs'
  ]
  loop
    execute format('alter table public.%I enable row level security', target_table);
    execute format('revoke all on table public.%I from anon, authenticated', target_table);
    execute format('grant select, insert, update on table public.%I to authenticated', target_table);

    execute format('drop policy if exists admin_select_%s on public.%I', target_table, target_table);
    execute format('drop policy if exists admin_insert_%s on public.%I', target_table, target_table);
    execute format('drop policy if exists admin_update_%s on public.%I', target_table, target_table);

    execute format(
      'create policy admin_select_%s on public.%I for select to authenticated using ((select private.is_admin_user()))',
      target_table,
      target_table
    );

    if target_table = 'profiles' then
      execute format(
        'create policy admin_insert_%s on public.%I for insert to authenticated with check ((select private.is_admin_owner()))',
        target_table,
        target_table
      );
      execute format(
        'create policy admin_update_%s on public.%I for update to authenticated using ((select private.is_admin_owner())) with check ((select private.is_admin_owner()))',
        target_table,
        target_table
      );
    elsif target_table = 'activity_logs' then
      execute format('revoke update on table public.%I from authenticated', target_table);
      execute format(
        'create policy admin_insert_%s on public.%I for insert to authenticated with check ((select private.is_admin_editor()))',
        target_table,
        target_table
      );
    else
      execute format(
        'create policy admin_insert_%s on public.%I for insert to authenticated with check ((select private.is_admin_editor()))',
        target_table,
        target_table
      );
      execute format(
        'create policy admin_update_%s on public.%I for update to authenticated using ((select private.is_admin_editor())) with check ((select private.is_admin_editor()))',
        target_table,
        target_table
      );
    end if;
  end loop;
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.sync_room_capacity_slots()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  slot_number integer;
  non_ac_price numeric(10,2);
  ac_room_price numeric(10,2);
begin
  select internal_non_ac_price, internal_ac_price
    into non_ac_price, ac_room_price
  from public.room_types
  where room_type_id = new.room_type_id;

  for slot_number in 1..greatest(new.capacity, 0) loop
    insert into public.beds (
      room_id,
      bed_code,
      bed_label,
      default_price,
      ac_price,
      status
    ) values (
      new.room_id,
      new.room_number || '-slot-' || slot_number::text,
      null,
      coalesce(non_ac_price, 0),
      coalesce(ac_room_price, 0),
      'Available'
    )
    on conflict (room_id, bed_code) do update
      set default_price = excluded.default_price,
          ac_price = excluded.ac_price,
          updated_at = now();
  end loop;

  with ranked_slots as (
    select
      bed_id,
      row_number() over (order by bed_code) as slot_rank
    from public.beds
    where room_id = new.room_id
  )
  update public.beds b
     set status = 'Inactive',
         updated_at = now()
    from ranked_slots rs
   where b.bed_id = rs.bed_id
     and rs.slot_rank > greatest(new.capacity, 0)
     and b.status <> 'Occupied';

  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.sync_room_capacity_slots() from public, anon, authenticated;

drop function if exists public.is_admin_user();
drop function if exists public.is_admin_editor();

alter table public.rooms
  drop constraint if exists rooms_capacity_security_check,
  add constraint rooms_capacity_security_check
    check (capacity between 1 and 4 and char_length(room_number) between 1 and 20);

alter table public.residents
  drop constraint if exists residents_input_security_check,
  add constraint residents_input_security_check
    check (
      char_length(full_name) between 1 and 120
      and char_length(phone) between 7 and 20
      and char_length(coalesce(email, '')) <= 254
      and char_length(coalesce(id_proof_number_masked, '')) <= 40
    );

alter table public.enquiries
  drop constraint if exists enquiries_input_security_check,
  add constraint enquiries_input_security_check
    check (
      char_length(name) between 1 and 120
      and char_length(phone) between 7 and 20
      and char_length(coalesce(message, '')) <= 2000
    );

alter table public.payments
  drop constraint if exists payments_positive_amount_security_check,
  add constraint payments_positive_amount_security_check check (amount > 0);

alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

commit;
