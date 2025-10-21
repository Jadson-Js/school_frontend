"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, Clock, GraduationCap } from "lucide-react";
import { generateLessonPlan, getLessonPlans } from "@/api/lessonPlan";
import { LessonPlanRequest } from "@/types/ILessonPlanResponse";
import LessonPlanCard from "@/components/Cards";

export default function LessonPlanGenerator() {
  const [formData, setFormData] = useState<LessonPlanRequest>({
    topic: "",
    grade_level: "",
    subject: "",
    learning_context: "",
    duration_minutes: "50",
  });

  const [isGenerating, setIsGenerating] = useState(false);

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
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    try {
      await generateLessonPlan(formData);

      window.location.reload();
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

        <LessonPlanCard />
      </div>
    </div>
  );
}
