-- Enable UUID generation extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (System Users Context)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    full_name text,
    preferred_locale text default 'en' not null,
    avatar_url text,
    parish_affiliation text
);

alter table public.profiles enable row level security;
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

-- 2. LITURGICAL CACHE TABLE (Scriptures & Prayers texts indexed by locale)
create table public.liturgical_content (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    category text not null, -- 'bible', 'agpeya', 'synaxarium', 'hymns'
    section_key text not null, -- e.g., '1st_hour', 'john_1'
    locale_code text not null, -- e.g., 'ar-EG', 'cop', 'en-US'
    title text not null,
    body_content text not null, -- Supports long semantic paragraphs
    search_vector tsvector -- For hyper-fast server-side spiritual text searches
);

create index idx_liturgical_search on public.liturgical_content using gin(search_vector);
alter table public.liturgical_content enable row level security;
create policy "Public content is readable by everyone" on public.liturgical_content for select using (true);

-- 3. PARISH COMMUNITY REALTME ENGINE
create table public.parish_broadcasts (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title jsonb not null, -- Multi-language map text support
    body jsonb not null,
    category text not null, -- 'news', 'services', 'education'
    media_url text,
    is_live boolean default false not null
);

alter table public.parish_broadcasts enable row level security;
create policy "Broadcasts are globally readable" on public.parish_broadcasts for select using (true);
