import React, { useState, useEffect } from "react";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { RowAdminPage } from "../../components/rowAdminPage";
import backButton from "../../assets/img/backPageIcon.svg";
import frontButton from "../../assets/img/frontPageIcon.svg";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { SearchBar } from "../../components/search";
import { SlidingSideBar } from "../../components/slidingSideBar";
import "./AdminPage.css";

export const AdminPage = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [inputPage, setInputPage] = useState(String(currentPage));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState({
    f1: false,
    f2: false,
    f3: false,
    f4: false,
    o1: false,
    o2: false,
    o3: false,
    o4: false,
    o5: false,
  });

  useEffect(() => {
    if (
      !options.f1 &&
      !options.f2 &&
      !options.f3 &&
      !options.f4 &&
      !options.o1 &&
      !options.o2 &&
      !options.o3 &&
      !options.o4 &&
      !options.o5
    ) {
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
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
      //alimentos caducados dCad
    } else if (options.f1 && options.o1) {
      fetch(
        `http://3.20.237.82:3000/alimentos/caducados/dCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); //alimentos proximos a caducar dCad
    } else if (options.f2 && options.o1) {
      fetch(
        `http://3.20.237.82:3000/alimentos/proximoscaducados/dCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos con disponibilidad dCad
    } else if (options.f3 && options.o1) {
      fetch(
        `http://3.20.237.82:3000/alimentos/disponibles/dCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); //alimentos no disponibles dCad
    } else if (options.f4 && options.o1) {
      fetch(
        `http://3.20.237.82:3000/alimentos/nodisponibles/dCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos caducados uCad
    } else if (options.f1 && options.o2) {
      fetch(
        `http://3.20.237.82:3000/alimentos/caducados/uCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos proximos a caducar uCad
    } else if (options.f2 && options.o2) {
      fetch(
        `http://3.20.237.82:3000/alimentos/proximoscaducados/uCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos con disponibilidad dCad
    } else if (options.f3 && options.o2) {
      fetch(
        `http://3.20.237.82:3000/alimentos/disponibles/uCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos sin disponibilidad uCad
    } else if (options.f4 && options.o2) {
      fetch(
        `http://3.20.237.82:3000/alimentos/nodisponibles/uCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos caducados dEnt
    } else if (options.f1 && options.o3) {
      fetch(
        `http://3.20.237.82:3000/alimentos/caducados/dEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos proximos a caducar dEnt
    } else if (options.f2 && options.o3) {
      fetch(
        `http://3.20.237.82:3000/alimentos/proximoscaducados/dEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos disponibles dEnt
    } else if (options.f3 && options.o3) {
      fetch(
        `http://3.20.237.82:3000/alimentos/disponibles/dEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos no disponibles dEnt
    } else if (options.f4 && options.o3) {
      fetch(
        `http://3.20.237.82:3000/alimentos/nodisponibles/dEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos caducados uEnt
    } else if (options.f1 && options.o4) {
      fetch(
        `http://3.20.237.82:3000/alimentos/caducados/uEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos proximos a caducar uEnt
    } else if (options.f2 && options.o4) {
      fetch(
        `http://3.20.237.82:3000/alimentos/proximoscaducados/uEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos disponibles uEnt
    } else if (options.f3 && options.o4) {
      fetch(
        `http://3.20.237.82:3000/alimentos/disponibles/uEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos nodisponibles uEnt
    } else if (options.f4 && options.o4) {
      fetch(
        `http://3.20.237.82:3000/alimentos/nodisponibles/uEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos caducados alfaB
    } else if (options.f1 && options.o5) {
      fetch(
        `http://3.20.237.82:3000/alimentos/caducados/alfaB?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos proximos a caducar alfaB
    } else if (options.f2 && options.o5) {
      fetch(
        `http://3.20.237.82:3000/alimentos/proximoscaducados/alfaB?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos disponibles alfaB
    } else if (options.f3 && options.o5) {
      fetch(
        `http://3.20.237.82:3000/alimentos/disponibles/alfaB?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos nodisponibles alfaB
    } else if (options.f4 && options.o5) {
      fetch(
        `http://3.20.237.82:3000/alimentos/nodisponibles/alfaB?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos caducados sin orden
    } else if (
      options.f1 &&
      !options.o1 &&
      !options.o2 &&
      !options.o3 &&
      !options.o4 &&
      !options.o5
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/caducados?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos proximos a caducar sin orden
    } else if (
      options.f2 &&
      !options.o1 &&
      !options.o2 &&
      !options.o3 &&
      !options.o4 &&
      !options.o5
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/proximoscaducados?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos disponibles sin orden
    } else if (
      options.f3 &&
      !options.o1 &&
      !options.o2 &&
      !options.o3 &&
      !options.o4 &&
      !options.o5
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/disponibles?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar solo alimentos nodisponibles sin orden
    } else if (
      options.f4 &&
      !options.o1 &&
      !options.o2 &&
      !options.o3 &&
      !options.o4 &&
      !options.o5
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/nodisponibles?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar todos los alimentos ordenados por dCad
    } else if (
      !options.f1 &&
      !options.f2 &&
      !options.f3 &&
      !options.f4 &&
      options.o1
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/ordenados/dCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar todos los alimentos ordenados por uCad
    } else if (
      !options.f1 &&
      !options.f2 &&
      !options.f3 &&
      !options.f4 &&
      options.o2
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/ordenados/uCad?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar todos los alimentos ordenados por dEnt
    } else if (
      !options.f1 &&
      !options.f2 &&
      !options.f3 &&
      !options.f4 &&
      options.o3
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/ordenados/dEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar todos los alimentos ordenados por uEnt
    } else if (
      !options.f1 &&
      !options.f2 &&
      !options.f3 &&
      !options.f4 &&
      options.o4
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/ordenados/uEnt?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar todos los alimentos ordenados por alfaB
    } else if (
      !options.f1 &&
      !options.f2 &&
      !options.f3 &&
      !options.f4 &&
      options.o5
    ) {
      fetch(
        `http://3.20.237.82:3000/alimentos/ordenados/alfaB?page=${currentPage}&pageSize=${pageSize}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setAlimentos(data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        }); // mostrar todos los alimentos ordenados por uEnt
    } else {
      console.log("No hay una combinación de filtros y ordenamiento válida.");
    }

    //set pages according to alimentos

    if (options.f1) {
      fetch(`http://3.20.237.82:3000/alimentos/count/caducados`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setTotalPages(Math.ceil(data.total / pageSize));
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else if (options.f2) {
      fetch(`http://3.20.237.82:3000/alimentos/count/proximoscaducados`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setTotalPages(Math.ceil(data.total / pageSize));
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else if (options.f3) {
      fetch(`http://3.20.237.82:3000/alimentos/count/disponibles`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setTotalPages(Math.ceil(data.total / pageSize));
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else if (options.f4) {
      fetch(`http://3.20.237.82:3000/alimentos/count/nodisponibles`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setTotalPages(Math.ceil(data.total / pageSize));
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else {
      fetch(`http://3.20.237.82:3000/alimentos/count`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          setTotalPages(Math.ceil(data.total / pageSize));
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  }, [currentPage, options, pageSize]);

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
        message="Saludos a todos, bienvenidos al sistema de administración del albergue, el día de hoy centrense en comprenderlo :) "
        size={100}
        className="guide"
      />
      <SearchBar />
      <SlidingSideBar options={options} setOptions={setOptions} />
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
