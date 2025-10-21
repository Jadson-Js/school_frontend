import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  // Pega o cookie store do next/headers
  const cookieStore = cookies(); 

  // Cria o cliente do servidor
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // A implementação de cookies agora precisa de get, set, e remove
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // O erro "TextEncoder is not defined" pode ocorrer em algumas
            // versões do Next.js. Isso é um paliativo.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, "", ...options });
          } catch (error) {
            // O mesmo paliativo acima
          }
        },
      },
    },
  );
};