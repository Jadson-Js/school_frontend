// Importa do @supabase/ssr
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Cria uma resposta inicial passando os headers da request
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Cria o cliente Supabase usando a nova biblioteca @supabase/ssr
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // A função 'get' lê os cookies da 'request'
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        // A função 'set' atualiza os cookies tanto na 'request' quanto na 'response'
        set(name: string, value: string, options: CookieOptions) {
          // 1. Atualiza os cookies na request (para uso no próprio middleware)
          request.cookies.set({
            name,
            value,
            ...options,
          });
          // 2. Atualiza a 'response' para que ela possa ser recriada com os novos cookies
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          // 3. Define o cookie na 'response' que será enviada ao cliente
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        // A função 'remove' funciona de forma similar à 'set'
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // A função principal do middleware é ATUALIZAR A SESSÃO.
  // Chamar supabase.auth.getUser() já faz isso automaticamente.
  // Ele vai ler o cookie, verificar se é válido, e se necessário,
  // usar o refresh_token para obter um novo access_token,
  // salvando-o nos cookies usando as funções 'set' e 'remove' acima.
  const {
    data: { user }, // A nova biblioteca retorna 'user' em vez de 'session'
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Se não há usuário (não logado) e está tentando acessar rota protegida
  if (!user && pathname == "/") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Se há usuário (logado) e está tentando acessar o login
  if (user && pathname === "/login") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Retorna a 'response' (que pode ter sido atualizada pelo supabase.auth.getUser())
  return response;
}

// A configuração do matcher permanece a mesma
export const config = {
  matcher: [
    "/", // Protege o dashboard e todas as suas sub-rotas
    "/login",
    "/signup",
  ],
};
