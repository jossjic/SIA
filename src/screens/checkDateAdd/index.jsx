import React, { useState } from "react";
import "./checkDateAdd.css";
import { Guide } from '../../components/guide';
import { ReturnButton } from "../../components/returnButton";
import { ButtonSquare } from "../../components/buttonSquare";
import { GeneralButton } from '../../components/button';
import { SelectDate } from '../../components/selectDate';

export const CheckDateAdd = () => {
    const products = [
        {id: 1, nombre:"Apocosipa12345aaaaaaaaaa", marca:"NA", cantidad: 250, unidad:"g"},
        {id: 2, nombre:"B", marca:"La Costeña", cantidad: 500, unidad:"g"},
        {id: 3, nombre:"Shifu", marca:"Del Valle", cantidad: 300, unidad:"g"}
    ];

    // Función que se ejecutará cuando se haga clic en el botón cuadrado
    const [showSelectDate, setShowSelectDate] = useState(false);

    // Función que se ejecutará cuando se haga clic en el botón cuadrado
    const handleButtonClick = () => {
        setShowSelectDate(true);
    };
    
    return (
        <div className="dateAdd">
            <div className="mensaje">
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
                                        {/* Pasando la función handleButtonClick como prop */}
                                        <ButtonSquare textElement="v" color="#74E140" onClick={handleButtonClick}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="botonesAdd">
                        <GeneralButton textElement="Cancelar" path="" color="#5982C0" />
                        <GeneralButton textElement="Agregar" path="" color="#74E140" />
                    </div>
                </div>
            </div>
            {showSelectDate && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <SelectDate />
                    </div>
                </div>
            )}
        </div>
    );
};
