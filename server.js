export const AdminPage = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAlimentos, setTotalAlimentos] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetch(`http://3.20.237.82:3000/alimentos/count`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los alimentos");
      })
      .then((data) => {
        setTotalAlimentos(data.total);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

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
        setAlimentos(data.alimentos);
        setTotalPages(Math.ceil(totalAlimentos / pageSize)); // Corrección
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [currentPage, totalAlimentos]); // Añadir totalAlimentos como dependencia

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="adminPage">
      {/* Tu código de retorno y guía */}

      <div className="alimentosBox">
        {alimentos.map((alimento) => (
          <RowAdminPage
            id={alimento.a_id}
            product={alimento.a_nombre}
            amount={alimento.a_cantidad}
            unit={alimento.um_id}
            brand={alimento.m_nombre}
            stock={alimento.a_stock}
            cadDate={alimento.a_fechaCaducidad}
            key={alimento.a_id}
          />
        ))}
      </div>

      <div className="paginacion">
        <button
          className="anterior"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          <img src={backButton} alt="backButton"></img>Página Anterior
        </button>
        <span className="bottom">{currentPage}</span> {/* Corrección */}
        <input
          type="text"
          value={currentPage}
          className="paginacionField"
          readOnly
        />
        <span className="top">{totalPages}</span>
        <button
          className="siguiente"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente Página<img src={frontButton} alt="frontButton"></img>
        </button>
      </div>
    </div>
  );
};
