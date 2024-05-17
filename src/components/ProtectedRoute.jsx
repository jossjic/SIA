import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, redirectTo = "/login" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false); 
  }, []);

  if (isLoading) {
    // Indicador de carga mientras se verifica el token
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};
