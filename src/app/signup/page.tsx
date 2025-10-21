"use client";

import React from "react";
// 1. MUDANÇA: Importei o UserPlus para o ícone
import { Eye, EyeOff, Mail, Lock, UserPlus, User } from "lucide-react";
import { supabase } from "../../services/supabase/Client"; // Ajuste o caminho se necessário
import { useRouter } from "next/navigation";
import Link from "next/link";

// 2. MUDANÇA: Renomeei o componente
export default function SignUpPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // 3. MUDANÇA: Adicionei estado para mensagem de sucesso (confirmação de email)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null,
  );

  const router = useRouter();

  // 4. MUDANÇA: Atualizei a função handleSubmit para 'signUp'
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Limpa erros anteriores
    setSuccessMessage(null); // Limpa sucesso anterior

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // Você pode adicionar mais opções aqui, como 'data' para nome, etc.
      // options: {
      //   data: {
      //     first_name: 'John',
      //   }
      // }
    });

    setIsLoading(false);

    if (error) {
      // 5. MUDANÇA: Atualizei as mensagens de erro comuns do cadastro
      if (error.message.includes("User already registered")) {
        setError("Este email já está em uso.");
      } else if (
        error.message.includes("Password should be at least 6 characters")
      ) {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else {
        setError(error.message);
      }
    } else {
      // 6. MUDANÇA: Lógica de sucesso
      // Por padrão, o Supabase envia um email de confirmação.
      // data.session será null se a confirmação for necessária.
      if (data.session === null) {
        setSuccessMessage(
          "Cadastro realizado! Por favor, verifique seu email para confirmar sua conta.",
        );
        // Limpa o formulário
        setEmail("");
        setPassword("");
      } else {
        // Se a confirmação de email estiver DESATIVADA no Supabase,
        // o usuário já estará logado (data.session não será null).
        console.log("Cadastro e login bem-sucedidos!", data.user);
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            {/* 7. MUDANÇA: Ícone e textos do cabeçalho */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Crie sua conta
            </h1>
            <p className="text-gray-600">
              Preencha os dados para se cadastrar gratuitamente.
            </p>
          </div>

          <div className="space-y-6">
            {/* Input de Email (sem alteração) */}
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
                  required
                />
              </div>
            </div>

            {/* Input de Senha (sem alteração) */}
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
                  required
                />
                <button
                  type="button"
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

            {/* 8. MUDANÇA: Adiciona o bloco de mensagem de SUCESSO */}
            {successMessage && (
              <div className="text-center text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg p-3">
                {successMessage}
              </div>
            )}

            {/* Bloco de ERRO (só mostra se não houver msg de sucesso) */}
            {error && !successMessage && (
              <div className="text-center text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              // 9. MUDANÇA: Desabilita também se o sucesso foi mostrado
              disabled={isLoading || successMessage !== null}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {/* 10. MUDANÇA: Textos do botão */}
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
                  Cadastrando...
                </span>
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>

          {/* 11. MUDANÇA: Link inferior para a página de Login */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Entre aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
