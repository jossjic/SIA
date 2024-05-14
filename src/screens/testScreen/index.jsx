import { useState, useEffect } from "react";
import "./AdminPage.css";
import { RowAdminPage } from "../../components/rowAdminPage";

export const TestScreen = () => {
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    fetch("http://3.144.175.151:3000/alimentos/join/marca")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los usuarios");
      })
      .then((data) => {
        console.log("Alimentos:", data);
        setAlimentos(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  return <></>;
};
