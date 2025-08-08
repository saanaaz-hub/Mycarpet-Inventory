-- Enable extensions
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- Enums
do $$ begin
  create type carpet_status as enum (
    'received','in_photography','in_restoration','in_inventory',
    'reserved','on_consignment','in_transit','delivered','returned','archived'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type movement_type as enum (
    'check_in','check_out','transfer','status_change','location_change','edit'
  );
exception when duplicate_object then null; end $$;

-- Tables
create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text check (type in ('warehouse','studio','store','event','customer','other')),
  address text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.carpets (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  public_id text unique not null,
  title text,
  description text,
  origin text,
  material text,
  size_cm text,
  year_estimated int,
  condition text,
  price_sek numeric(12,2),
  currency text default 'SEK',
  owner text,
  tags text[] default '{}',
  status carpet_status not null default 'received',
  location_id uuid references public.locations(id) on delete set null,
  cover_image_url text,
  public_notes text,
  private_notes text,
  created_by uuid,
  updated_by uuid,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.movements (
  id uuid primary key default gen_random_uuid(),
  carpet_id uuid references public.carpets(id) on delete cascade,
  type movement_type not null,
  from_location_id uuid references public.locations(id),
  to_location_id uuid references public.locations(id),
  from_status carpet_status,
  to_status carpet_status,
  notes text,
  acted_by uuid,
  acted_at timestamptz default now()
);

create table if not exists public.images (
  id uuid primary key default gen_random_uuid(),
  carpet_id uuid references public.carpets(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.share_links (
  id uuid primary key default gen_random_uuid(),
  carpet_id uuid references public.carpets(id) on delete cascade,
  token text unique not null,
  expires_at timestamptz,
  created_by uuid,
  created_at timestamptz default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  entity text not null,
  entity_id uuid not null,
  action text not null,
  changes jsonb,
  user_id uuid,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_carpets_status on public.carpets (status);
create index if not exists idx_carpets_location on public.carpets (location_id);
create index if not exists idx_carpets_search on public.carpets using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(origin,'')));

-- Helper function
create or replace function public.carpet_counts_by_status()
returns table (status carpet_status, count bigint)
language sql as $$
  select status, count(*) from public.carpets group by status order by 2 desc;
$$;
