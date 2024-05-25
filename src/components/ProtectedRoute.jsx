import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function getCookieValue(cookieName) {
  // Separamos las cookies por punto y coma para obtener un array de cookies
  const cookies = document.cookie.split(";");

  // Buscamos la cookie específica por su nombre
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Si la cookie actual comienza con el nombre deseado, la devolvemos
    if (cookie.startsWith(cookieName + "=")) {
      // Extraemos el valor de la cookie y lo devolvemos
      return cookie.substring(cookieName.length + 1);
    }
  }
  // Si no encontramos la cookie, devolvemos null
  return null;
}

export const ProtectedRoute = ({ children, redirectTo = "/mainPage" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const checkSession = () => {
      const isAuthenticated = document.cookie.includes("userCookieSIA=");

      setIsLoading(false);

      if (!isAuthenticated) {
        // Si no se encuentra la cookie, establecer la ruta de redirección
        setRedirectPath("/login");
      } else {
        const userCookieValue = getCookieValue("userCookieSIA");
        localStorage.setItem("userId", userCookieValue);
        
        setRedirectPath(redirectTo);
      }
    };

    checkSession();
  }, [redirectTo]);

  if (isLoading) {
    // Indicador de carga mientras se verifica la sesión
    return <div>Loading...</div>;
  }

  // Si se establece la ruta de redirección, redirigir al usuario
  if (redirectPath) {
    return <Navigate to={redirectPath} />;
  }

  // Si hay una sesión activa, renderizar el contenido protegido
  return children;
};
