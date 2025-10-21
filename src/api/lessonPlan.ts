import {
  LessonPlanRequest,
  LessonPlanResponse,
} from "@/types/ILessonPlanResponse";
import { getCookie } from "@/utils/getCookie";

const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const generateLessonPlan = async (
  params: LessonPlanRequest,
): Promise<LessonPlanResponse> => {
  const body = JSON.stringify(params);

  try {
    const response = await fetch(
      `${API_URL}/functions/v1/generate_lesson_plans`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY,
          Authorization: "Bearer " + getCookie("access_token"),
        },
        body,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message == "JWT expired") {
        window.location.href = "/login";
      }
      throw new Error(errorData.message || "Falha no generate lesson plan.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro detalhado no serviço de generate lesson plan:", error);
    throw error;
  }
};

export const getLessonPlans = async () => {
  try {
    const response = await fetch(`${API_URL}/rest/v1/lesson_plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
        Authorization: "Bearer " + getCookie("access_token"),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message == "JWT expired") {
        window.location.href = "/login";
        return;
      }
      throw new Error(errorData.message || "Falha no get lesson plans.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro detalhado no serviço de signup:", error);
    throw error;
  }
};
