begin;

truncate table
  public.activity_logs,
  public.payments,
  public.rent_invoices,
  public.deposits,
  public.resident_occupancy,
  public.residents,
  public.enquiries,
  public.expenses,
  public.beds,
  public.rooms
restart identity cascade;

update public.hostels
   set total_rooms = 20,
       total_capacity = 78,
       updated_at = now()
 where hostel_name = 'Prince Deluxe PG for Boys';

with hostel as (
  select hostel_id
  from public.hostels
  where hostel_name = 'Prince Deluxe PG for Boys'
  limit 1
),
standard_type as (
  select room_type_id
  from public.room_types
  where room_type_name = 'Standard 4-Sharing Rooms'
  limit 1
),
partition_type as (
  select room_type_id
  from public.room_types
  where room_type_name = 'Special Partitioned 2-Bed Room'
  limit 1
),
room_seed(room_number, floor_number, capacity, room_type_id, notes) as (
  values
    ('101', '1', 4, (select room_type_id from standard_type), null),
    ('102', '1', 4, (select room_type_id from standard_type), null),
    ('103', '1', 4, (select room_type_id from standard_type), null),
    ('104', '1', 4, (select room_type_id from standard_type), null),
    ('201', '2', 4, (select room_type_id from standard_type), null),
    ('202', '2', 4, (select room_type_id from standard_type), null),
    ('203', '2', 4, (select room_type_id from standard_type), null),
    ('204', '2', 4, (select room_type_id from standard_type), null),
    ('301', '3', 4, (select room_type_id from standard_type), null),
    ('302', '3', 4, (select room_type_id from standard_type), null),
    ('303', '3', 4, (select room_type_id from standard_type), null),
    ('304', '3', 4, (select room_type_id from standard_type), null),
    ('401', '4', 4, (select room_type_id from standard_type), null),
    ('402', '4', 4, (select room_type_id from standard_type), null),
    ('403', '4', 4, (select room_type_id from standard_type), null),
    ('404', '4', 4, (select room_type_id from standard_type), null),
    ('501', '5', 4, (select room_type_id from standard_type), null),
    ('502', '5', 4, (select room_type_id from standard_type), null),
    ('503', '5', 4, (select room_type_id from standard_type), null),
    ('504', '5', 2, (select room_type_id from partition_type), 'Partitioned 2-bed room')
)
insert into public.rooms (
  hostel_id,
  room_type_id,
  room_number,
  floor_number,
  capacity,
  is_ac_available,
  has_attached_washroom,
  has_geyser,
  has_locker,
  notes,
  status
)
select
  (select hostel_id from hostel),
  room_seed.room_type_id,
  room_seed.room_number,
  room_seed.floor_number,
  room_seed.capacity,
  true,
  true,
  true,
  true,
  room_seed.notes,
  'Available'
from room_seed;

commit;
