# MyCarpet Lager (Next.js + Supabase)

## Quick Deploy (Vercel + Supabase)
1) Create a Supabase project → copy **Project URL**, **anon key**, **service_role key** (Settings → API).
2) In Supabase SQL editor, run in order:
   - `supabase/schema.sql`
   - `supabase/policies.sql`
   - (Create storage bucket `carpets` and set policies; see `supabase/storage.sql` notes)
3) Deploy to Vercel:
   - Create new project and import this repository
   - Add Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = (your project URL)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (anon key)
     - `SUPABASE_SERVICE_ROLE_KEY` = (service role key)
     - `APP_BASE_URL` = your Vercel URL (you can update later to your custom domain)
4) Run the app. Visit `/dashboard`, `/carpets`, `/scan`

## Using the App
- Add carpets in Supabase table editor or build a simple form later.
- Open a carpet detail → click **Download QR** → print & attach.
- Share public page: `/c/{public_id}`.

## Notes
- RLS uses a simple role claim `role` in JWT (`admin`, `staff`, `viewer`). Set this via Supabase Auth `app_metadata`.
- This is an MVP skeleton; extend with forms, image uploads, and movement write routes as needed.
