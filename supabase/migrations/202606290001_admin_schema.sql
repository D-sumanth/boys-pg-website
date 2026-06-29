create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'Viewer' check (role in ('Owner', 'Manager', 'Viewer')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hostels (
  hostel_id uuid primary key default gen_random_uuid(),
  hostel_name text not null,
  business_type text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null,
  state text not null,
  pincode text not null,
  landmark text,
  total_rooms integer not null default 0,
  total_capacity integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.room_types (
  room_type_id uuid primary key default gen_random_uuid(),
  hostel_id uuid references public.hostels(hostel_id) on delete cascade,
  room_type_name text not null,
  sharing_capacity integer not null,
  has_extra_space boolean not null default false,
  has_partition boolean not null default false,
  internal_non_ac_price numeric(10,2) not null default 0,
  internal_ac_price numeric(10,2) not null default 0,
  public_starting_price numeric(10,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.rooms (
  room_id uuid primary key default gen_random_uuid(),
  hostel_id uuid not null references public.hostels(hostel_id) on delete cascade,
  room_type_id uuid not null references public.room_types(room_type_id),
  room_number text not null,
  floor_number text,
  capacity integer not null,
  is_ac_available boolean not null default false,
  has_attached_washroom boolean not null default true,
  has_geyser boolean not null default true,
  has_locker boolean not null default true,
  notes text,
  status text not null default 'Available' check (status in ('Available', 'Occupied', 'Maintenance', 'Inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(hostel_id, room_number)
);

create table if not exists public.beds (
  bed_id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(room_id) on delete cascade,
  bed_code text not null,
  bed_label text,
  default_price numeric(10,2) not null default 0,
  ac_price numeric(10,2) not null default 0,
  status text not null default 'Available' check (status in ('Available', 'Occupied', 'Reserved', 'Maintenance', 'Inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(room_id, bed_code)
);

create table if not exists public.residents (
  resident_id uuid primary key default gen_random_uuid(),
  resident_code text unique,
  full_name text not null,
  phone text not null,
  whatsapp_number text,
  email text,
  date_of_birth date,
  resident_type text not null default 'Student' check (resident_type in ('Student', 'Working Professional', 'Other')),
  college_or_company text,
  course_or_role text,
  native_place text,
  guardian_name text,
  guardian_phone text,
  id_proof_type text,
  id_proof_number_masked text,
  photo_url text,
  status text not null default 'Active' check (status in ('Active', 'Vacated', 'Blocked', 'Inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.resident_occupancy (
  occupancy_id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.residents(resident_id) on delete cascade,
  bed_id uuid not null references public.beds(bed_id),
  room_id uuid not null references public.rooms(room_id),
  joining_date date not null,
  leaving_date date,
  agreed_monthly_rent numeric(10,2) not null default 0,
  is_ac_selected boolean not null default false,
  notice_period_days integer not null default 30,
  status text not null default 'Active' check (status in ('Active', 'Moved', 'Vacated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists one_active_occupancy_per_resident
  on public.resident_occupancy(resident_id) where status = 'Active';
create unique index if not exists one_active_occupancy_per_bed
  on public.resident_occupancy(bed_id) where status = 'Active';

create table if not exists public.rent_invoices (
  rent_invoice_id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.residents(resident_id),
  occupancy_id uuid references public.resident_occupancy(occupancy_id),
  invoice_month integer not null check (invoice_month between 1 and 12),
  invoice_year integer not null check (invoice_year >= 2026),
  billing_period_start date,
  billing_period_end date,
  monthly_rent_amount numeric(10,2) not null default 0,
  ac_charges numeric(10,2) not null default 0,
  other_charges numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  late_fee numeric(10,2) not null default 0,
  total_amount numeric(10,2) not null default 0,
  paid_amount numeric(10,2) not null default 0,
  balance_amount numeric(10,2) not null default 0,
  due_date date,
  status text not null default 'Pending' check (status in ('Pending', 'Partial', 'Paid', 'Overdue', 'Waived', 'Cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(resident_id, invoice_month, invoice_year)
);

create table if not exists public.payments (
  payment_id uuid primary key default gen_random_uuid(),
  resident_id uuid references public.residents(resident_id),
  rent_invoice_id uuid references public.rent_invoices(rent_invoice_id),
  deposit_id uuid,
  payment_date date not null default current_date,
  amount numeric(10,2) not null check (amount >= 0),
  payment_direction text not null default 'In' check (payment_direction in ('In', 'Out')),
  payment_purpose text not null check (payment_purpose in ('Rent', 'Deposit', 'Refund', 'Advance', 'Fine', 'Food Extra', 'AC Charges', 'Maintenance', 'Other')),
  payment_mode text not null check (payment_mode in ('Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque', 'Other')),
  transaction_reference text,
  receipt_number text unique,
  collected_by_user_id uuid references public.profiles(id),
  proof_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.deposits (
  deposit_id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references public.residents(resident_id),
  occupancy_id uuid references public.resident_occupancy(occupancy_id),
  deposit_amount numeric(10,2) not null default 0,
  deposit_paid_amount numeric(10,2) not null default 0,
  deposit_due_amount numeric(10,2) not null default 0,
  is_refundable boolean not null default true,
  deduction_amount numeric(10,2) not null default 0,
  refund_amount numeric(10,2) not null default 0,
  refund_date date,
  refund_payment_id uuid references public.payments(payment_id),
  status text not null default 'Pending' check (status in ('Pending', 'Paid', 'Partially Paid', 'Refunded', 'Adjusted', 'Forfeited')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.payments
  drop constraint if exists payments_deposit_id_fkey;
alter table public.payments
  add constraint payments_deposit_id_fkey foreign key (deposit_id) references public.deposits(deposit_id);

create table if not exists public.expense_categories (
  expense_category_id uuid primary key default gen_random_uuid(),
  category_name text not null unique,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expenses (
  expense_id uuid primary key default gen_random_uuid(),
  hostel_id uuid not null references public.hostels(hostel_id),
  expense_category_id uuid references public.expense_categories(expense_category_id),
  expense_date date not null default current_date,
  description text not null,
  amount numeric(10,2) not null check (amount >= 0),
  payment_mode text not null check (payment_mode in ('Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque', 'Other')),
  paid_by_user_id uuid references public.profiles(id),
  bill_available boolean not null default false,
  bill_url text,
  is_recurring boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  enquiry_id uuid primary key default gen_random_uuid(),
  hostel_id uuid references public.hostels(hostel_id),
  name text not null,
  phone text not null,
  email text,
  resident_type text check (resident_type in ('Student', 'Working Professional', 'Other')),
  college_or_company text,
  source text not null default 'Website' check (source in ('WhatsApp', 'Call', 'Instagram', 'Google Maps', 'Referral', 'College', 'Walk-in', 'Website', 'Other')),
  preferred_room_type_id uuid references public.room_types(room_type_id),
  ac_preference text not null default 'No Preference' check (ac_preference in ('AC', 'Non-AC', 'No Preference')),
  expected_joining_date date,
  budget numeric(10,2),
  message text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Visit Scheduled', 'Visited', 'Joined', 'Lost', 'Follow Up Later')),
  converted_resident_id uuid references public.residents(resident_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  activity_log_id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid,
  action text not null check (action in ('Create', 'Update', 'Delete', 'Login', 'Export', 'Approve')),
  old_value_json jsonb,
  new_value_json jsonb,
  ip_address inet,
  created_at timestamptz not null default now()
);

create index if not exists residents_phone_idx on public.residents(phone);
create index if not exists residents_code_idx on public.residents(resident_code);
create index if not exists beds_status_idx on public.beds(status);
create index if not exists rent_invoices_month_year_idx on public.rent_invoices(invoice_year, invoice_month);
create index if not exists payments_payment_date_idx on public.payments(payment_date);
create index if not exists expenses_expense_date_idx on public.expenses(expense_date);
create index if not exists enquiries_status_source_idx on public.enquiries(status, source);

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles','hostels','room_types','rooms','beds','residents','resident_occupancy',
    'rent_invoices','payments','deposits','expense_categories','expenses','enquiries'
  ]
  loop
    execute format('drop trigger if exists set_%s_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%s_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end;
$$;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and is_active = true
      and role in ('Owner', 'Manager', 'Viewer')
  );
$$;

alter table public.profiles enable row level security;
alter table public.hostels enable row level security;
alter table public.room_types enable row level security;
alter table public.rooms enable row level security;
alter table public.beds enable row level security;
alter table public.residents enable row level security;
alter table public.resident_occupancy enable row level security;
alter table public.rent_invoices enable row level security;
alter table public.payments enable row level security;
alter table public.deposits enable row level security;
alter table public.expense_categories enable row level security;
alter table public.expenses enable row level security;
alter table public.enquiries enable row level security;
alter table public.activity_logs enable row level security;

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
    execute format('create policy admin_select_%s on public.%I for select to authenticated using (public.is_admin_user())', table_name, table_name);
    execute format('create policy admin_insert_%s on public.%I for insert to authenticated with check (public.is_admin_user())', table_name, table_name);
    execute format('create policy admin_update_%s on public.%I for update to authenticated using (public.is_admin_user()) with check (public.is_admin_user())', table_name, table_name);
  end loop;
end;
$$;

insert into public.hostels (
  hostel_name, business_type, contact_person, phone, email, address_line_1,
  address_line_2, city, state, pincode, landmark, total_rooms, total_capacity
) values (
  'Prince Deluxe PG for Boys',
  'Boys PG / Hostel',
  'D Kiran Kumar',
  '+91 7093945019',
  'princedeluxepg@gmail.com',
  'Plot No. 80M, SY No. 748, 749',
  'Rangareddy Nagar, Brindavan Colony',
  'Hyderabad',
  'Telangana',
  '501218',
  'Near Commissioner of Police, Shamshabad Zone',
  23,
  90
) on conflict do nothing;

insert into public.room_types (
  hostel_id, room_type_name, sharing_capacity, has_extra_space, has_partition,
  internal_non_ac_price, internal_ac_price, public_starting_price
)
select h.hostel_id, x.room_type_name, x.sharing_capacity, x.has_extra_space, x.has_partition,
  x.internal_non_ac_price, x.internal_ac_price, x.public_starting_price
from public.hostels h
cross join (
  values
    ('Premium 4-Sharing Rooms', 4, true, false, 8500, 10500, 8500),
    ('Standard 4-Sharing Rooms', 4, false, false, 8000, 10000, 8500),
    ('Special Partitioned 2-Bed Room', 2, false, true, 9000, 11000, 8500)
) as x(room_type_name, sharing_capacity, has_extra_space, has_partition, internal_non_ac_price, internal_ac_price, public_starting_price)
where h.hostel_name = 'Prince Deluxe PG for Boys'
  and not exists (
    select 1 from public.room_types rt
    where rt.hostel_id = h.hostel_id and rt.room_type_name = x.room_type_name
  );

insert into public.expense_categories (category_name)
values
  ('Food'),
  ('Utilities'),
  ('Staff'),
  ('Repairs'),
  ('Marketing'),
  ('Admin'),
  ('Compliance'),
  ('Miscellaneous')
on conflict (category_name) do nothing;
