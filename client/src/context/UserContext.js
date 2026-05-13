import { createContext, useEffect, useState } from "react";
import { loadUser, saveUser, clearUser } from "../services/authService";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUserState] = useState(() => loadUser());

  useEffect(() => {
    if (user && user.name) {
      saveUser(user);
    } else {
      clearUser();
    }
  }, [user]);

  const setUser = (userData) => setUserState(userData);

  const logout = () => setUserState(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
