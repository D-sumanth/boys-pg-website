begin;

update public.hostels
set hostel_name = 'Prince Deluxe PG For Boys',
    phone = '+91 7093945019',
    email = 'princedeluxepg@gmail.com',
    address_line_1 = 'H.No. 21-49/5/A/1',
    address_line_2 = 'Ranga Reddy Nagar, Brindavan Colony',
    city = 'Shamshabad, Hyderabad',
    state = 'Telangana',
    pincode = '501218',
    landmark = null,
    total_rooms = 23,
    total_capacity = 90,
    updated_at = now()
where lower(hostel_name) = lower('Prince Deluxe PG For Boys');

create or replace function public.is_admin_user()
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

create or replace function public.is_admin_editor()
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

revoke all on function public.is_admin_user() from public, anon;
revoke all on function public.is_admin_editor() from public, anon;
grant execute on function public.is_admin_user() to authenticated;
grant execute on function public.is_admin_editor() to authenticated;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles','hostels','room_types','rooms','beds','residents','resident_occupancy',
    'rent_invoices','payments','deposits','expense_categories','expenses','enquiries','activity_logs'
  ]
  loop
    execute format('drop policy if exists admin_select_%s on public.%I', table_name, table_name);
    execute format('drop policy if exists admin_insert_%s on public.%I', table_name, table_name);
    execute format('drop policy if exists admin_update_%s on public.%I', table_name, table_name);
    execute format('create policy admin_select_%s on public.%I for select to authenticated using ((select public.is_admin_user()))', table_name, table_name);
    execute format('create policy admin_insert_%s on public.%I for insert to authenticated with check ((select public.is_admin_editor()))', table_name, table_name);
    execute format('create policy admin_update_%s on public.%I for update to authenticated using ((select public.is_admin_editor())) with check ((select public.is_admin_editor()))', table_name, table_name);
  end loop;
end;
$$;

commit;
