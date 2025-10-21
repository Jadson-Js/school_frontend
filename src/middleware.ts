import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;

  const isLoginPage = req.nextUrl.pathname === "/login";

  // Se não tiver token e tentar acessar página protegida → volta pro login
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se tiver token e tentar ir pro login → manda pra home
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Define quais rotas serão afetadas pelo middleware
export const config = {
  matcher: ["/"],
};
