-- ======================================================
-- MUSTIKA TRAVEL CHATBOT - SUPABASE DATABASE MIGRATION
-- Copy & Run this SQL script in your Supabase SQL Editor
-- ======================================================

-- 1. Create Chat Sessions Table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id TEXT PRIMARY KEY,
    user_name TEXT DEFAULT 'Tamu Mustika Travel',
    user_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Indexes for High Performance Querying
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 5. Public Policies (Allows anonymous website visitors to store & read their chat history)
CREATE POLICY "Allow public insert to chat_sessions" 
    ON public.chat_sessions FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public update to chat_sessions" 
    ON public.chat_sessions FOR UPDATE 
    USING (true);

CREATE POLICY "Allow public select from chat_sessions" 
    ON public.chat_sessions FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert to chat_messages" 
    ON public.chat_messages FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public select from chat_messages" 
    ON public.chat_messages FOR SELECT 
    USING (true);
