import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user || !user.name) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
