import templates from "../data/templates";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://custom-greetings-backend.onrender.com/api";

export const getTemplates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`);

    if (!response.ok) {
      throw new Error("Template API request failed");
    }

    const data = await response.json();
    return data.templates;
  } catch (error) {
    console.warn("Using local templates because the API is unavailable", error);
    return templates;
  }
};
