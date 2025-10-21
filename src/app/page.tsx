"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Clock, GraduationCap } from "lucide-react";

export default function LessonPlanGenerator() {
  const [formData, setFormData] = useState({
    topic: "Ciclo da agua",
    grade_level: "1° ano",
    subject: "Ciência",
    learning_context: "Ao ar livre",
    duration_minutes: 30,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const gradeLevels = [
    "Educação Infantil",
    "1º ano",
    "2º ano",
    "3º ano",
    "4º ano",
    "5º ano",
    "6º ano",
    "7º ano",
    "8º ano",
    "9º ano",
    "1º ano EM",
    "2º ano EM",
    "3º ano EM",
  ];

  const subjects = [
    "Língua Portuguesa",
    "Matemática",
    "Ciências",
    "História",
    "Geografia",
    "Arte",
    "Educação Física",
    "Inglês",
    "Ensino Religioso",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration_minutes" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // 1. O formulário chama a *SUA* API interna do Next.js
      const response = await fetch(
        "http://127.0.0.1:54321/functions/v1/generate_lesson_plans",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNreHd6dnhjaWJ0bXp6eWVjemxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5Njg0OTYsImV4cCI6MjA3NjU0NDQ5Nn0.bQcQdrpoiX7dH_Jan1fMbGnMHLnBdg786sDNY-CitPQ",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU0MzIxL2F1dGgvdjEiLCJzdWIiOiI5MDg2NmM5Yy0wN2MyLTQ2MmYtYjk0Yy1iN2QyODQ0OTllYzIiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzYxMDIyOTg1LCJpYXQiOjE3NjEwMTkzODUsImVtYWlsIjoiamFkc29uMjAwNTE5NjVAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6ImphZHNvbjIwMDUxOTY1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjkwODY2YzljLTA3YzItNDYyZi1iOTRjLWI3ZDI4NDQ5OWVjMiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzYxMDE5Mzg1fV0sInNlc3Npb25faWQiOiJkYmU2OTczYS0wOTM0LTRiN2QtODY5Yy0yYTMzMDhkNjRkOGYiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.TMsogFPIil2ll7FT81yFkZiNOw8tSkqqLnQVZT-6gwk",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();
      const {
        introducao_ludica,
        objetivo_bncc,
        passo_a_passo,
        rubrica_avaliacao,
      } = result[0];

      console.log(result[0]);

      if (response.ok) {
        setGeneratedPlan({
          introducao_ludica,
          objetivo_bncc,
          passo_a_passo: [passo_a_passo],
          rubrica_avaliacao,
        });
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-10 h-10 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">
              Gerador de Planos de Aula
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Crie planos de aula personalizados com IA alinhados à BNCC
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            {/* Topic */}
            <div className="text-gray-700">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 mr-2 text-purple-600" />
                Tema da Aula *
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                required
                placeholder="Ex: Ciclo da água, Frações, Revolução Francesa..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {/* Grade Level and Subject */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-gray-700">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4 mr-2 text-purple-600" />
                  Série/Ano *
                </label>
                <select
                  name="grade_level"
                  value={formData.grade_level}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="">Selecione...</option>
                  {gradeLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-gray-700">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Disciplina *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                >
                  <option value="">Selecione...</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration */}
            <div className="text-gray-700">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 mr-2 text-purple-600" />
                Duração da Aula em minutos (opcional)
              </label>
              <input
                type="number"
                name="duration_minutes"
                value={formData.duration_minutes}
                onChange={handleChange}
                min="15"
                max="180"
                step="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {/* Learning Context */}
            <div className="text-gray-700">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Contexto de Aprendizagem (opcional)
              </label>
              <textarea
                name="learning_context"
                value={formData.learning_context}
                onChange={handleChange}
                rows="4"
                placeholder="Descreva o perfil da turma, conhecimentos prévios, recursos disponíveis, necessidades especiais..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Gerando plano de aula...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Gerar Plano de Aula
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Plan */}
        {generatedPlan && (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
              Plano de Aula Gerado
            </h2>

            {/* Introdução Lúdica */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">
                🎭 Introdução Lúdica
              </h3>
              <p className="text-gray-700">{generatedPlan.introducao_ludica}</p>
            </div>

            {/* Objetivo BNCC */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                🎯 Objetivo de Aprendizagem (BNCC)
              </h3>
              <p className="text-gray-700">{generatedPlan.objetivo_bncc}</p>
            </div>

            {/* Passo a Passo */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                📋 Passo a Passo da Atividade
              </h3>
              <div className="space-y-4">
                {generatedPlan.passo_a_passo.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 border-l-4 border-green-500"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {index + 1}. {step.etapa}
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {step.tempo}
                      </span>
                    </div>
                    <p className="text-gray-700">{step.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rubrica de Avaliação */}
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">
                ⭐ Rubrica de Avaliação
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(generatedPlan.rubrica_avaliacao).map(
                  ([nivel, descricao]) => (
                    <div
                      key={nivel}
                      className="bg-white rounded-lg p-4 border border-orange-200"
                    >
                      <h4 className="font-semibold text-gray-800 mb-2 capitalize">
                        {nivel.replace("_", " ")}
                      </h4>
                      <p className="text-sm text-gray-700">{descricao}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                💾 Salvar Plano
              </button>
              <button className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
                📄 Exportar PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
