-- Execute este SQL no Supabase: Database → SQL Editor → New query

-- 1. Adiciona coluna nome_cliente na tabela rastreio_origem (se ainda não existir)
ALTER TABLE rastreio_origem ADD COLUMN IF NOT EXISTS nome_cliente TEXT;

-- 2. Cria a tabela de comprovantes (se ainda não existir)
CREATE TABLE IF NOT EXISTS comprovantes_taxa (
  id            SERIAL PRIMARY KEY,
  tracking_code TEXT NOT NULL,
  file_url      TEXT NOT NULL,
  file_name     TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Libera leitura e escrita para o frontend (anon key)
ALTER TABLE comprovantes_taxa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert comprovantes" ON comprovantes_taxa
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "select comprovantes" ON comprovantes_taxa
  FOR SELECT TO anon USING (true);
