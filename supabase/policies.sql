alter table public.carpets enable row level security;
alter table public.movements enable row level security;
alter table public.images enable row level security;
alter table public.locations enable row level security;
alter table public.audit_logs enable row level security;
alter table public.share_links enable row level security;

-- Simple baseline: authenticated users can select; admins/staff can write (role via JWT claim 'role')
-- Adjust as needed in Supabase Auth -> JWT custom claims.
create policy if not exists carpets_select on public.carpets for select to authenticated using (true);
create policy if not exists carpets_write on public.carpets for all to authenticated using ((auth.jwt() ->> 'role') in ('admin','staff')) with check ((auth.jwt() ->> 'role') in ('admin','staff'));

create policy if not exists movements_select on public.movements for select to authenticated using (true);
create policy if not exists movements_write on public.movements for all to authenticated using ((auth.jwt() ->> 'role') in ('admin','staff')) with check ((auth.jwt() ->> 'role') in ('admin','staff'));

create policy if not exists images_select on public.images for select to authenticated using (true);
create policy if not exists images_write on public.images for all to authenticated using ((auth.jwt() ->> 'role') in ('admin','staff')) with check ((auth.jwt() ->> 'role') in ('admin','staff'));

create policy if not exists locations_select on public.locations for select to authenticated using (true);
create policy if not exists locations_write on public.locations for all to authenticated using ((auth.jwt() ->> 'role') in ('admin','staff')) with check ((auth.jwt() ->> 'role') in ('admin','staff'));

create policy if not exists audit_select on public.audit_logs for select to authenticated using ((auth.jwt() ->> 'role') = 'admin');

-- Public read for public page by public_id (select-only)
create policy if not exists carpets_public_read on public.carpets for select to anon using (true);
