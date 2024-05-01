import React, { useState } from "react";
import "./checkDateAdd.css";
import { Guide } from '../../components/guide';
import { ReturnButton } from "../../components/returnButton";
import { ButtonSquare } from "../../components/buttonSquare";
import { GeneralButton } from '../../components/button';
import { SelectDate } from '../../components/selectDate';

export const CheckDateAdd = () => {
    const [showSelectDate, setShowSelectDate] = useState(false);
    const [productId, setProductId] = useState(null);

    const [products, setProducts] = useState([
        { id: 1, nombre: "Lata de Atún", marca: "NA", cantidad: 200, unidad: "g", estado: false },
        { id: 2, nombre: "Bolsa de Arroz", marca: "La Costeña", cantidad: 500, unidad: "g", estado: false },
        { id: 3, nombre: "Jugo de Uva", marca: "Del Valle", cantidad: 300, unidad: "g", estado: false }
    ]);

    const handleButtonClick = (productId) => {
        setProductId(productId);
        setShowSelectDate(true);
    };

    const handleCancelSelectDate = () => {
        setShowSelectDate(false);
    };

    const handleConfirmButtonClick = (productId) => {
        // Actualiza el estado de "verificación" del producto a true
        setProducts(prevProducts => prevProducts.map(product => {
            if (product.id === productId) {
                return { ...product, estado: true };
            }
            return product;
        }));
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
                                <tr key={product.id}>
                                    <td>{product.nombre}</td>
                                    <td>{product.cantidad + ' ' + product.unidad}</td>
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
                        <SelectDate onCancel={handleCancelSelectDate} onConfirm={() => handleConfirmButtonClick(productId)}/>
                    </div>
                </div>
            )}
        </div>
    );
};
