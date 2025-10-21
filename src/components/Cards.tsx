import React, { useState, useEffect } from "react";
import { X, Clock, Target, List, Award } from "lucide-react";
import { getLessonPlans } from "@/api/lessonPlan";

interface Step {
  etapa: string;
  tempo: string;
  descricao: string;
}

interface RubricEvaluation {
  excelente: string;
  bom: string;
  satisfatorio: string;
  em_desenvolvimento: string;
}

interface LessonPlan {
  ludic_introduction: string;
  bncc_goal: string;
  step_by_step: Step[];
  rubric_evaluation: RubricEvaluation;
}

export default function LessonPlanCard() {
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);
  const [lessons, setLessons] = useState<LessonPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessonPlans();
        const formatedLessons = data.map((item) => {
          return JSON.parse(item.generated_content);
        });
        setLessons(formatedLessons);
      } catch (error) {
        console.error("Erro ao carregar planos de aula:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-6 animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            onClick={() => setSelectedLesson(lesson)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer border border-gray-200"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <List className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 flex-1">
                Plano de Aula {index + 1}
              </h3>
            </div>

            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {lesson.ludic_introduction}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{lesson.step_by_step.length} etapas</span>
            </div>
          </div>
        ))}
      </div>

      {selectedLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800">
                Plano de Aula Detalhado
              </h2>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Introdução Lúdica */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <List className="w-5 h-5 text-purple-600" />
                  </div>
                  Introdução Lúdica
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedLesson.ludic_introduction}
                </p>
              </section>

              {/* Objetivo BNCC */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  Objetivo BNCC
                </h3>
                <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                  {selectedLesson.bncc_goal}
                </p>
              </section>

              {/* Passo a Passo */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  Passo a Passo
                </h3>
                <div className="space-y-4">
                  {selectedLesson.step_by_step.map((step, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {index + 1}. {step.etapa}
                        </h4>
                        <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                          {step.tempo}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {step.descricao}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Rubrica de Avaliação */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  Rubrica de Avaliação
                </h3>
                <div className="grid gap-3">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Excelente
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {selectedLesson.rubric_evaluation.excelente}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">Bom</h4>
                    <p className="text-gray-700 text-sm">
                      {selectedLesson.rubric_evaluation.bom}
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Satisfatório
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {selectedLesson.rubric_evaluation.satisfatorio}
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Em Desenvolvimento
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {selectedLesson.rubric_evaluation.em_desenvolvimento}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
              <button
                onClick={() => setSelectedLesson(null)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
