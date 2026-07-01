create or replace function public.sync_room_capacity_slots()
returns trigger
language plpgsql
set search_path = public
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
