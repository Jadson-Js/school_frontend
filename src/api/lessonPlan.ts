import {
  LessonPlanRequest,
  LessonPlanResponse,
} from "@/types/ILessonPlanResponse";
import { getCookie } from "@/utils/config";

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
          apiKey: API_KEY!,
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
      throw new Error(errorData.message || "Failed to generate lesson plan.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Detailed error in generate lesson plan service:", error);
    throw error;
  }
};

export const getLessonPlans = async () => {
  try {
    const response = await fetch(`${API_URL}/rest/v1/lesson_plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY!,
        Authorization: "Bearer " + getCookie("access_token"),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.message == "JWT expired") {
        window.location.href = "/login";
        return;
      }
      throw new Error(errorData.message || "Failed to get lesson plans.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Detailed error in get lesson plans service:", error);
    throw error;
  }
};
