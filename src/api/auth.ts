const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const signup = async (email: string, password: string) => {
  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const response = await fetch(`${API_URL}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: API_KEY,
      },
      body,
    });

    if (!response.ok) {
      console.log(response);
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Detailed error in signup service:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const response = await fetch(
      `${API_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY,
        },
        body,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Login failed. Check your credentials.",
      );
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    document.cookie = `access_token=${data.access_token}; path=/;`;
    window.location.href = "/";
  } catch (error) {
    console.error("Detailed error in login service:", error);
    throw error;
  }
};
