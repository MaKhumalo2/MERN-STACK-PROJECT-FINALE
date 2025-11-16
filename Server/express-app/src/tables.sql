-- Enable uuid extension (Postgres)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    region TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
-- activity_types
CREATE TABLE IF NOT EXISTS activity_types (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL
);
-- emission_factors
CREATE TABLE IF NOT EXISTS emission_factors (
    id SERIAL PRIMARY KEY,
    activity_type_id INT REFERENCES activity_types(id) ON DELETE CASCADE,
    unit TEXT NOT NULL,
    co2e_per_unit NUMERIC(12, 6) NOT NULL,
    region TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);
-- activities
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type_id INT REFERENCES activity_types(id) ON DELETE
    SET NULL,
        amount NUMERIC NOT NULL,
        co2e NUMERIC NOT NULL,
        notes TEXT,
        timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- badges
CREATE TABLE IF NOT EXISTS badges (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT
);
-- user_badges
CREATE INDEX IF NOT EXISTS idx_community_region_week ON community_weekly_totals (region, week);