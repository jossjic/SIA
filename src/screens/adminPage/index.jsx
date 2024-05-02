import React, { useState, useEffect } from "react";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { RowAdminPage } from "../../components/rowAdminPage";
import backButton from "../../assets/img/backPageIcon.svg";
import frontButton from "../../assets/img/frontPageIcon.svg";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import "./AdminPage.css";

export const AdminPage = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [inputPage, setInputPage] = useState(String(currentPage));

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(
      `http://3.20.237.82:3000/alimentos/join/marca?page=${currentPage}&pageSize=${pageSize}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los alimentos");
      })
      .then((data) => {
        console.log("Alimentos:", data);
        setAlimentos(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

    fetch(`http://3.20.237.82:3000/alimentos/count`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los alimentos");
      })
      .then((data) => {
        setTotalPages(Math.ceil(data.total / pageSize));
        console.log("Total de páginas:", totalPages);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [currentPage]);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    setInputPage(String(currentPage - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setInputPage(String(currentPage + 1));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    setInputPage("1");
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    setInputPage(String(totalPages));
  };

  const goToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      setIsModalOpen(true);
      setInputPage(String(currentPage));
    }
  };

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleInputBlur = () => {
    goToPage();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      goToPage();
    }
  };

  return (
    <div className="adminPage">
      <ReturnButton />
      <Guide
        message="Estás viendo los alimentos relacionados a este usuario, puedes agregar, eliminar, editar y crear nuevos alimentos desde esta ventana."
        size={80}
        className="guide"
      />

      <div className="alimentosBox">
        {alimentos.map((alimento) => (
          <div className="divRow" key={alimento.a_id}>
            <RowAdminPage
              id={alimento.a_id}
              product={alimento.a_nombre}
              amount={alimento.a_cantidad}
              unit={alimento.um_id}
              brand={
                alimento.m_nombre == null ? "Sin marca" : alimento.m_nombre
              }
              stock={alimento.a_stock}
              cadDate={alimento.a_fechaCaducidad}
            />
            <hr />
          </div>
        ))}
      </div>
      <div className="paginacion">
        <button
          className="anterior"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <img src={backButton} alt="backButton" /> Página Anterior
        </button>
        <button className="bottom" onClick={goToFirstPage}>
          1
        </button>
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="paginacionField"
        />
        <button className="top" onClick={goToLastPage}>
          {totalPages}
        </button>
        <button
          className="siguiente"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente Página <img src={frontButton} alt="frontButton" />
        </button>
      </div>
      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp
            message="La página ingresada no es válida, por favor ingresa un número de página válido."
            answer1="Ok"
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
