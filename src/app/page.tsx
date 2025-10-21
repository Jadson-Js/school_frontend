"use client";

import { useState } from "react";
import { BookOpen, Sparkles, Clock, GraduationCap } from "lucide-react";

export default function LessonPlanGenerator() {
  const [formData, setFormData] = useState({
    topic: "",
    grade_level: "",
    subject: "",
    learning_context: "",
    duration_minutes: 50,
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
      [name]: name === "duration_minutes" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    try {
      // Simulação de resposta para demonstração
      // Substitua isso pela sua chamada real à API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setGeneratedPlan({
        ludic_introduction:
          "Uma introdução lúdica e envolvente sobre o tema escolhido, conectando com a realidade dos alunos.",
        bncc_goal:
          "Objetivo alinhado com a BNCC para a série e disciplina selecionadas.",
        step_by_step: [
          {
            etapa: "Aquecimento",
            tempo: "10 min",
            descricao: "Atividade inicial para engajar os alunos no tema.",
          },
          {
            etapa: "Desenvolvimento",
            tempo: "25 min",
            descricao: "Exploração prática e teórica do conteúdo principal.",
          },
          {
            etapa: "Fechamento",
            tempo: "15 min",
            descricao: "Consolidação do aprendizado e avaliação.",
          },
        ],
        rubric_evaluation: {
          excelente: "Demonstra completo domínio do conteúdo",
          bom: "Compreende os conceitos principais",
          satisfatorio: "Compreensão básica do conteúdo",
          em_desenvolvimento: "Necessita de apoio adicional",
        },
      });
    } catch (error) {
      console.error("Erro ao gerar plano:", error);
      alert("Erro ao gerar o plano de aula. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
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

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="space-y-6">
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

            <div className="text-gray-700">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Contexto de Aprendizagem (opcional)
              </label>
              <textarea
                name="learning_context"
                value={formData.learning_context}
                onChange={handleChange}
                rows={4}
                placeholder="Descreva o perfil da turma, conhecimentos prévios, recursos disponíveis, necessidades especiais..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
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
        </form>

        {generatedPlan && (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
              Plano de Aula Gerado
            </h2>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">
                🎭 Introdução Lúdica
              </h3>
              <p className="text-gray-700">
                {generatedPlan.ludic_introduction}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                🎯 Objetivo de Aprendizagem (BNCC)
              </h3>
              <p className="text-gray-700">{generatedPlan.bncc_goal}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                📋 Passo a Passo da Atividade
              </h3>
              <div className="space-y-4">
                {generatedPlan.step_by_step.map((step, index) => (
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

            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">
                ⭐ Rubrica de Avaliação
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(generatedPlan.rubric_evaluation).map(
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
