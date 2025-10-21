import { createClient } from "@supabase/supabase-js";

// Lê as variáveis com o prefixo correto do Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Adiciona uma verificação para dar um erro mais claro se elas ainda estiverem faltando
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Variáveis de ambiente do Supabase (URL ou Anon Key) não encontradas.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
