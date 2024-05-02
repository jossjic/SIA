import React, { useState, useEffect } from "react";
import "./checkDateAdd.css";
import { Guide } from '../../components/guide';
import { ReturnButton } from "../../components/returnButton";
import { ButtonSquare } from "../../components/buttonSquare";
import { GeneralButton } from '../../components/button';
import { SelectDate } from '../../components/selectDate';

export const CheckDateAdd = () => {
    const [showSelectDate, setShowSelectDate] = useState(false);
    const [products, setProducts] = useState([]);
    const ids = [1, 2]; // Tu arreglo de IDs

     useEffect(() => {
        const params = new URLSearchParams();
        ids.forEach((id) => {
          params.append('ids', id);
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
    

    const handleButtonClick = (productId) => {
        setShowSelectDate(true);
    };

    const handleCancelSelectDate = () => {
        setShowSelectDate(false);
    };

    const handleConfirmButtonClick = () => {
        // Aquí puedes realizar cualquier acción adicional después de confirmar la fecha
        setShowSelectDate(false);
    };

    const allProductsVerified = () => {
        return products.every(product => product.estado);
    };

    return (
        <div className="dateAdd">
            <div className="mensajeA">
                <Guide message="Estás a punto de agregar una lista de productos. Recuerda verificar la fecha de caducidad de los productos que deseas agregar." size={100} />
            </div>
            <div className="buttonBackAdd">
                <ReturnButton />
                <h1 className="titulo">Agregar Productos</h1>
            </div>
            <div className="cuadrado">
                <p>Estás por agregar los siguientes productos</p>
                <div className="tableContainerAdd">
                    <table className="userTableAdd">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Marca</th>
                                <th>Verificación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.a_id}>
                                    <td>{product.a_nombre}</td>
                                    <td>{product.a_cantidad}</td>
                                    <td>{product.marca}</td>
                                    <td>
                                        <ButtonSquare textElement="v" color={product.estado ? "#00FF00" : "#E14040"} onClick={() => handleButtonClick(product.id)}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="botonesAdd">
                        <GeneralButton textElement="Cancelar" path="" color="#5982C0" />
                        <GeneralButton textElement="Agregar" path="" color={allProductsVerified() ? "#00FF00" : "#8F938D"} />
                    </div>
                </div>
            </div>
            {showSelectDate && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <SelectDate onCancel={handleCancelSelectDate} onConfirm={handleConfirmButtonClick}/>
                    </div>
                </div>
            )}
        </div>
    );
};
