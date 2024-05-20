import React, { useState, useEffect } from "react";
import "./checkDateDelete.css";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { ButtonSquare, ButtonCircle } from "../../components/buttonSquare";
import { GeneralButton } from "../../components/button";
import { SelectDateDelete } from "../../components/selectDateDelete";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { useNavigate } from "react-router-dom";

export const CheckDateDelete = ({ selectedIds }) => {
  const [showSelectDate, setShowSelectDate] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); 
  const [products, setProducts] = useState([]);
  const [dates, setDates] = useState({});
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false); 
  const [buttonSquareColor, setButtonSquareColor] = useState("#E14040");
  const [buttonColors, setButtonColors] = useState({});
  const [ids, setIds] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    setIds(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    const params = new URLSearchParams();
    ids.forEach((id) => {
      params.append("ids", id);
    });

    fetch(`http://3.144.175.151:3000/alimentos/checkDate?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, [ids]);

  const updateProductState = (productId, newState) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.a_id === productId) {
          return { ...product, estado: newState };
        }
        return product;
      });
    });
  };

  useEffect(() => {
    const fetchDates = async () => {
      const promises = ids.map((id) => {
        return fetch(`http://3.144.175.151:3000/alimentos/atun/${id}`)
          .then((response) => response.json())
          .then((data) => ({ [id]: data }));
      });

      const datesByProduct = await Promise.all(promises);
      const datesObject = datesByProduct.reduce(
        (acc, current) => ({ ...acc, ...current }),
        {}
      );

      setDates(datesObject);
    };

    fetchDates();
  }, [ids]);

  const handleButtonClick = (product) => {
    setSelectedProductId(product.a_id);
    setShowSelectDate(true);
  };

  const handleButtonClickSquare = (productId) => {
    setButtonColors((prevColors) => ({
      ...prevColors,
      [productId]: "#00FF00", 
    }));
  };

  const handleCancelSelectDate = () => {
    setShowSelectDate(false);
  };

  const handleConfirmButtonClick = () => {
    updateProductState(selectedProductId, true);
    setShowSelectDate(false);
  };

  const allProductsVerified = () => {
    return products.every((product) => buttonColors[product.a_id] === "#00FF00");
  };

  const handleDeleteSelected = () => {
    Promise.all(selectedIds.map(id =>
      fetch(`http://3.144.175.151:3000/alimentos/stock/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ a_stock: 0 })
      })
    )).then(() => {
      return Promise.all(selectedIds.map(id =>
        fetch(`http://3.144.175.151:3000/alimentos/stock/${id}`, { method: "DELETE" })
      ));
    }).then(() => {
      setConfirmDeleteOpen(false);
      setDeleteSuccessOpen(true);
    }).catch(error => {
      console.error("Error:", error);
    });
  };
  

  const handleSuccessClose = () => {
    setDeleteSuccessOpen(false);
    navigate("/AdminPage");
  };

  return (
    <div className="dateDelete">
      <div className="mensajeD">
        <Guide
          message="Estas a punto de eliminar una lista de productos, recuerda verificar la fecha de caducidad de los productos que deseas eliminar."
          size={100}
        />
      </div>
      <div className="buttonBackDelete">
        <ReturnButton />
        <h1 className="tituloD">Eliminar Productos</h1>
      </div>
      <div className="cuadradoD">
        <p>Estas por agregar los siguientes productos</p>
        <div className="tableContainerDelete">
          <table className="userTableDelete">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Marca</th>
                <th>Stock</th>
                <th>Fecha Caducidad</th>
                <th>Verificación</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.a_id}>
                  <td>{product.a_nombre}</td>
                  <td>{product.a_cantidad + " " + product.um_id}</td>
                  <td>{product.m_id}</td>
                  <td>{product.a_stock}</td>
                  <td>{product.a_fechaCaducidad.substring(0, 10)}</td>
                  <td>
                    <ButtonSquare
                      textElement="v"
                      color={buttonColors[product.a_id] || "#E14040"}
                      onClick={() => handleButtonClickSquare(product.a_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="botonesDelete">
            <GeneralButton 
              textElement="Cancelar" 
              path="" 
              color="#5982C0" 
              onClick={() => {
                navigate(-1);
                setSelectedIds([]);
              }}
            />
            <GeneralButton
              textElement="Eliminar"
              onClick={() => allProductsVerified() && setConfirmDeleteOpen(true)}
              color={allProductsVerified() ? "#E14040" : "#8F938D"}
              disabled={!allProductsVerified()} // Añadir esta línea para deshabilitar el botón si no todos los productos están verificados
            />
            {confirmDeleteOpen && (
              <ConfirmationPopUp
                message="¿Está seguro que desea eliminar a los alimentos seleccionados?"
                answer1="Si"
                answer2="No"
                funct={handleDeleteSelected}
                isOpen={confirmDeleteOpen}
                closeModal={() => setConfirmDeleteOpen(false)}
              />
            )}
            {deleteSuccessOpen && (
              <ConfirmationPopUp
                message="Los alimentos se eliminaron correctamente."
                answer1="OK"
                funct={handleSuccessClose}
                isOpen={deleteSuccessOpen}
                closeModal={handleSuccessClose}
              />
            )}
          </div>
        </div>
      </div>
      {showSelectDate && (
        <div className="modalOverlay">
          <div className="modalContent">
            <SelectDateDelete
              dates={dates[selectedProductId]}
              onCancel={handleCancelSelectDate}
              onConfirm={handleConfirmButtonClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};
