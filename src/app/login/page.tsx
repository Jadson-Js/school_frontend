"use client";

import React from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
// 1. Importe o seu cliente Supabase
import { useRouter } from "next/navigation"; // (Se estiver usando Next.js 13+ App Router)
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  // 2. Adicione um estado para erros
  const [error, setError] = React.useState<string | null>(null);

  // (Opcional, mas recomendado: para redirecionar após o login)
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // 3. Atualize a função handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Limpa erros anteriores

    // Troca o setTimeout pela chamada real do Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setIsLoading(false);

    if (error) {
      // 4. Se der erro, mostre a mensagem
      if (error.message === "Invalid login credentials") {
        setError("Email ou senha inválidos.");
      } else {
        setError(error.message);
      }
    } else {
      // 5. Se der certo, redirecione o usuário
      console.log("Login bem-sucedido!", data.user);
      // Exemplo de redirecionamento com Next.js App Router:
      router.push("/");
      router.refresh();
      // Ou com react-router-dom: navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* 6. (MUITO RECOMENDADO) Troque a <div> por <form> e use onSubmit */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            {/* ... (o resto do seu JSX de cabeçalho) ... */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-gray-600">
              Entre com suas credenciais para continuar
            </p>
          </div>

          <div className="space-y-6">
            {/* ... (Input de Email) ... */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative text-gray-700">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  required // Adiciona validação HTML
                />
              </div>
            </div>

            {/* ... (Input de Senha) ... */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </label>
              <div className="relative text-gray-700">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition"
                  required // Adiciona validação HTML
                />
                <button
                  type="button" // Importante: evita submeter o form
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* 7. Mostre o erro para o usuário */}
            {error && (
              <div className="text-center text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit" // 8. Mude de onClick para type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {/* ... (Lógica do SVG de loading) ... */}
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Não tem uma conta?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Cadastre-se gratuitamente
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
