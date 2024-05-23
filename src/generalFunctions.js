import { useNavigate } from "react-router-dom";

export const formatDate = (date) => {
  // Check if the date is undefined or null
  if (!date) {
    return "";
  }



  // Create a new Date object from the input date string, treating it as UTC
  const fecha = new Date(date);

  // Get the year, month, and day from the date object
  const anio = fecha.getUTCFullYear(); // Get UTC year
  const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, "0"); // Get UTC month
  const dia = fecha.getUTCDate().toString().padStart(2, "0"); // Get UTC day

  // Return the formatted date string "YYYY/MM/DD"
  return `${anio}/${mes}/${dia}`;
};

// Function to format date and time
export const formatDateTime = (date) => {
  // Check if the date is undefined or null
  if (!date) {
    return "";
  }

  // Create a new Date object from the input date string, treating it as UTC
  const dateTime = new Date(date);

  // Get the year, month, day, hours, minutes, and seconds from the date object
  const anio = dateTime.getUTCFullYear(); // Get UTC year
  const mes = (dateTime.getUTCMonth() + 1).toString().padStart(2, "0"); // Get UTC month
  const dia = dateTime.getUTCDate().toString().padStart(2, "0"); // Get UTC day
  const hora = dateTime.getUTCHours().toString().padStart(2, "0"); // Get UTC hours
  const minuto = dateTime.getUTCMinutes().toString().padStart(2, "0"); // Get UTC minutes
  const segundo = dateTime.getUTCSeconds().toString().padStart(2, "0"); // Get UTC seconds

  // Return the formatted date and time string "YYYY/MM/DD HH:MM:SS"
  return `${anio}/${mes}/${dia} ${hora}:${minuto}:${segundo}`;
};


export const logout = (navigate) => {
  return new Promise((resolve, reject) => {
    const refreshToken = localStorage.getItem("refreshToken");

    fetch("http://3.144.175.151:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }),
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        navigate("/login");
        resolve(); // Resuelve la promesa cuando se complete la operación
      })
      .catch((err) => {
        console.error("Error al cerrar sesión:", err);
        // Incluso si hay un error, elimina los tokens y redirige
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        navigate("/login");
        reject(err); // Rechaza la promesa si hay un error
      });
  });
};
