import React, { useState, useEffect } from "react";
import { X, Clock, Target, List, Award } from "lucide-react";
import { getLessonPlans } from "@/api/lessonPlan";

// --- TIPOS (Interfaces) ---
// Mantidos no topo para clareza
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

// --- COMPONENTES AUXILIARES ---

/**
 * Exibe o esqueleto de carregamento
 */
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

/**
 * Exibe um card de plano de aula no grid
 */
interface LessonCardProps {
  lesson: LessonPlan;
  index: number;
  onClick: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, index, onClick }) => (
  <div
    onClick={onClick}
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
);

/**
 * Componente de seção padronizado para o modal
 */
interface ModalSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const ModalSection: React.FC<ModalSectionProps> = ({
  title,
  icon,
  children,
}) => (
  <section>
    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
      <div className="p-2 rounded-lg">{icon}</div>
      {title}
    </h3>
    {children}
  </section>
);

/**
 * Item da Rubrica de Avaliação
 */
interface RubricItemProps {
  level: string;
  description: string;
  color: "green" | "blue" | "yellow" | "orange";
}

const colorClasses = {
  green: {
    bg: "bg-green-50",
    border: "border-green-500",
    text: "text-green-800",
  },
  blue: { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-800" },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-500",
    text: "text-yellow-800",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-500",
    text: "text-orange-800",
  },
};

const RubricItem: React.FC<RubricItemProps> = ({
  level,
  description,
  color,
}) => {
  const classes = colorClasses[color];
  return (
    <div
      className={`${classes.bg} p-4 rounded-lg border-l-4 ${classes.border}`}
    >
      <h4 className={`font-semibold ${classes.text} mb-2`}>{level}</h4>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
};

/**
 * Exibe o modal com os detalhes do plano de aula
 */
interface LessonPlanDetailModalProps {
  lesson: LessonPlan;
  onClose: () => void;
}

const LessonPlanDetailModal: React.FC<LessonPlanDetailModalProps> = ({
  lesson,
  onClose,
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-800">
          Plano de Aula Detalhado
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <ModalSection
          title="Introdução Lúdica"
          icon={
            <div className="bg-purple-100">
              <List className="w-5 h-5 text-purple-600" />
            </div>
          }
        >
          <p className="text-gray-700 leading-relaxed">
            {lesson.ludic_introduction}
          </p>
        </ModalSection>

        <ModalSection
          title="Objetivo BNCC"
          icon={
            <div className="bg-blue-100">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
          }
        >
          <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
            {lesson.bncc_goal}
          </p>
        </ModalSection>

        <ModalSection
          title="Passo a Passo"
          icon={
            <div className="bg-green-100">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
          }
        >
          <div className="space-y-4">
            {lesson.step_by_step.map((step, index) => (
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
        </ModalSection>

        <ModalSection
          title="Rubrica de Avaliação"
          icon={
            <div className="bg-yellow-100">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          }
        >
          <div className="grid gap-3">
            <RubricItem
              level="Excelente"
              description={lesson.rubric_evaluation.excelente}
              color="green"
            />
            <RubricItem
              level="Bom"
              description={lesson.rubric_evaluation.bom}
              color="blue"
            />
            <RubricItem
              level="Satisfatório"
              description={lesson.rubric_evaluation.satisfatorio}
              color="yellow"
            />
            <RubricItem
              level="Em Desenvolvimento"
              description={lesson.rubric_evaluation.em_desenvolvimento}
              color="orange"
            />
          </div>
        </ModalSection>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4 flex justify-end">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function LessonPlanCard() {
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);
  const [lessons, setLessons] = useState<LessonPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getLessonPlans();
        const formatedLessons = data
          .map((item) => {
            try {
              // Parse individualmente para evitar que um erro quebre todo o map
              return JSON.parse(item.generated_content);
            } catch (parseError) {
              console.error(
                "Erro ao parsear o JSON de um plano de aula:",
                parseError,
                item,
              );
              return null; // Retorna null para planos com erro
            }
          })
          .filter(Boolean); // Filtra os planos que falharam no parse (null)

        setLessons(formatedLessons as LessonPlan[]);
      } catch (error) {
        // Seu console.error já estava em português, o que é ótimo!
        console.error("Erro ao carregar planos de aula:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <LessonCard
            key={index}
            lesson={lesson}
            index={index}
            onClick={() => setSelectedLesson(lesson)}
          />
        ))}
      </div>

      {selectedLesson && (
        <LessonPlanDetailModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </>
  );
}
