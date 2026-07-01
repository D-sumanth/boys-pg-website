# Prince Deluxe PG Admin Setup

This project includes a private admin MVP under `/admin` for Prince Deluxe PG for Boys.

## 1. Create Supabase Project

1. Create a Supabase project.
2. Copy these values into `.env.local` for local development and into Vercel Project Settings for production:

```txt
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Do not commit `.env.local`. The service role key must never be exposed to browser code.

## 2. Apply Database Migration

Apply the SQL file in:

```txt
supabase/migrations/202606290001_admin_schema.sql
```

You can apply it through the Supabase SQL editor or Supabase CLI. It creates:

- `profiles`
- `hostels`
- `room_types`
- `rooms`
- `beds`
- `residents`
- `resident_occupancy`
- `rent_invoices`
- `payments`
- `deposits`
- `expense_categories`
- `expenses`
- `enquiries`
- `activity_logs`

It also enables RLS, adds admin policies, and seeds:

- Prince Deluxe PG for Boys hostel details
- Premium 4-Sharing Rooms
- Standard 4-Sharing Rooms
- Special Partitioned 2-Bed Room
- Expense categories

Room numbers are seeded from `101-104` through `501-504` using `supabase/reset_admin_rooms_seed.sql`.
Admin users do not enter bed codes. Room capacity slots are created automatically in the hidden `beds` table.
The current reset script treats room `504` as the special partitioned 2-bed room; update that one row if the partition room changes.

## 3. Create First Admin User

1. In Supabase Auth, create the first user with email/password.
2. Copy the Auth user UUID.
3. Insert the matching profile row:

```sql
insert into public.profiles (id, full_name, role, is_active)
values ('AUTH_USER_UUID_HERE', 'D Kiran Kumar', 'Owner', true);
```

Roles supported for future use:

- `Owner`
- `Manager`
- `Viewer`

The MVP requires a valid Supabase Auth session and an active `profiles` row to access protected admin pages.

## 4. Run Locally

```bash
corepack pnpm install
corepack pnpm dev
```

Open:

```txt
http://localhost:3000/admin/login
```

## 5. Deploy On Vercel

1. Push code to GitHub.
2. Add the same Supabase env vars in Vercel.
3. Deploy normally through the existing Git/Vercel integration.
4. Confirm `/admin/login` loads and `/admin/dashboard` redirects to login when logged out.

## 6. Backups And Privacy

- Enable Supabase backups if your plan supports them.
- Export monthly CSV reports and save copies to Google Drive.
- Collect only necessary resident details.
- Store ID proof numbers only in masked format such as `XXXX-XXXX-1234`.
- Keep future document uploads private.
- Do not expose internal room pricing on the public website.

## 7. Current MVP Limits

- Rent invoice generation, deposits, expenses, reports and settings are protected placeholder pages.
- Rooms can be edited manually, but room slots are created automatically from capacity.
- Residents are assigned to a room; the system uses the next available hidden room slot.
- The admin uses Supabase REST/Auth directly because package installation was blocked by registry/TLS errors in the local environment. When registry access is healthy, you can add `@supabase/supabase-js`, `@supabase/ssr`, and `zod` for richer typed clients and validation.
