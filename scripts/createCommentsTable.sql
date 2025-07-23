-- Script para crear la tabla de comentarios en Supabase

-- Habilitar la extensión uuid-ossp si no está habilitada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla blog_comments
CREATE TABLE IF NOT EXISTS blog_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 0,
  user_avatar TEXT,
  is_reply_to UUID REFERENCES blog_comments(id),
  is_approved BOOLEAN DEFAULT TRUE,
  is_reported BOOLEAN DEFAULT FALSE,
  report_reason TEXT
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_comments_post_id ON blog_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_is_reply_to ON blog_comments(is_reply_to);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments(created_at);

-- Crear políticas de seguridad para permitir acceso público
BEGIN;
  -- Política para permitir SELECT a todos
  DROP POLICY IF EXISTS allow_public_select_blog_comments ON blog_comments;
  CREATE POLICY allow_public_select_blog_comments ON blog_comments
    FOR SELECT USING (true);
  
  -- Política para permitir INSERT a todos (los comentarios requieren aprobación)
  DROP POLICY IF EXISTS allow_public_insert_blog_comments ON blog_comments;
  CREATE POLICY allow_public_insert_blog_comments ON blog_comments
    FOR INSERT WITH CHECK (true);
  
  -- Política para permitir UPDATE solo a administradores (se configura en la interfaz de Supabase)
  
  -- Política para permitir DELETE solo a administradores (se configura en la interfaz de Supabase)
COMMIT;

-- Habilitar RLS (Row Level Security)
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;