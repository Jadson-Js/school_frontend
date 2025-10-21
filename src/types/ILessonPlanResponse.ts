export interface LessonPlanRequest {
  topic: string;
  grade_level: string;
  subject: string;
  learning_context: string | null;
  duration_minutes: string | null;
}

export interface LessonPlanResponse {
  success: boolean;
  lesson_plan_id: {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: string;
    topic: string;
    grade_level: string;
    subject: string;
    learning_context: string;
    duration_minutes: number;
    generated_content: string;
    prompt_debug: string;
  };
  content: {
    ludic_introduction: string;
    bncc_goal: string;
    step_by_step: string;
    rubric_evaluation: string;
  };
  metadata: {
    topic: string;
    grade_level: string;
    subject: string;
    learning_context: string;
    duration_minutes: string;
    created_at: string;
  };
}
