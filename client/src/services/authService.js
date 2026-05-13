const STORAGE_KEY = "custom-greetings-user";

export const loadUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to load user from storage", error);
    return null;
  }
};

export const saveUser = (user) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user to storage", error);
  }
};

export const clearUser = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear user storage", error);
  }
};
