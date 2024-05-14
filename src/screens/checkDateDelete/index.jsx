import React, { useState, useEffect } from "react";
import "./checkDateDelete.css";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { ButtonSquare, ButtonCircle } from "../../components/buttonSquare";
import { GeneralButton } from "../../components/button";
import { SelectDateDelete } from "../../components/selectDateDelete";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";

export const CheckDateDelete = ({ selectedIds }) => {
  const [showSelectDate, setShowSelectDate] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Nuevo estado para el ID del producto seleccionado
  const [products, setProducts] = useState([]);
  const [dates, setDates] = useState({}); // Estado para guardar las fechas por producto

  // Para el DELETE
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); 

  const [buttonSquareColor, setButtonSquareColor] = useState("#E14040");
  // Mantén un estado para los colores de los botones cuadrados
  const [buttonColors, setButtonColors] = useState({});

  const [ids, setIds] = useState([]); // Tu arreglo de IDs inicial

  // Actualizar los IDs cada vez que selectedIds cambie
  useEffect(() => {
    setIds(selectedIds);
  }, [selectedIds]);

  /*
    const products = [
        {id: 1, nombre:"Lata de Frijol", marca:"NA", cantidad: 250, unidad:"g"},
        {id: 2, nombre:"Sopa do coditos", marca:"La Costeña", cantidad: 500, unidad:"g"},
        {id: 3, nombre:"Lata de Atún", marca:"Del Valle", cantidad: 300, unidad:"g"}
    ];
    */

  useEffect(() => {
    const params = new URLSearchParams();
    ids.forEach((id) => {
      params.append("ids", id);
    });

    fetch(`http://3.20.237.82:3000/alimentos/checkDate?${params.toString()}`)
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
  }, [ids]); // Agregué ids como dependencia del efecto

  const updateProductState = (productId, newState) => {
    console.log(
      "Updating product state for product ID:",
      productId,
      "with new state:",
      newState
    );
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.a_id === productId) {
          return { ...product, estado: newState };
        }
        return product;
      });
    });
  };

  // Nuevo efecto para obtener las fechas
  useEffect(() => {
    const fetchDates = async () => {
      const promises = ids.map((id) => {
        return fetch(`http://3.20.237.82:3000/alimentos/atun/${id}`)
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
  }, []); // Dependencia vacía, solo se ejecuta una vez

  const handleButtonClick = (product) => {
    setSelectedProductId(product.a_id);
    setShowSelectDate(true);
  };

  const handleButtonClickSquare = (productId) => {
    setButtonColors((prevColors) => ({
      ...prevColors,
      [productId]: "#00FF00", // Cambia el color a verde
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
    // Verifica si todos los productos están en verde en buttonColors
    return products.every((product) => buttonColors[product.a_id] === "#00FF00");
  };

  const handleDeleteSelected = () => {
    Promise.all(selectedIds.map(id => 
      fetch(`http://3.20.237.82:3000/alimentos/${id}`, { method: "DELETE" })
    )).then(() => {
      setUsers(users.filter(user => !selectedIds.includes(user.id)));
      setSelectedIds([]);
      setConfirmDeleteOpen(false);
    }).catch(error => {
      console.error("Error:", error);
    });
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
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Marca</th>
              <th>Stock</th>
              <th>Fecha Caducidad</th>
              <th>Verificación</th>
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
                      color={buttonColors[product.a_id] || "#E14040"} // Usa el color del estado o el color predeterminado
                      onClick={() => handleButtonClickSquare(product.a_id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="botonesDelete">
            <GeneralButton textElement="Cancelar" path="" color="#5982C0" />
            <GeneralButton
              textElement="Eliminar"
              onClick = {() => setConfirmDeleteOpen(true)}
              color={allProductsVerified() ? "#E14040" : "#8F938D"
              }
            />
            {confirmDeleteOpen && (
            <ConfirmationPopUp
              message="¿Está seguro que desea eliminar a los alimentos seleccionados permanentemente?"
              answer1="Si"
              answer2="No"
              funct={handleDeleteSelected}
              isOpen={confirmDeleteOpen}
              closeModal={() => setConfirmDeleteOpen(false)}
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
