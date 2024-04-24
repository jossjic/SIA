import React from "react";
import "./checkDateAdd.css";
import { InfoBanner } from '../../components/guide';
import { ReturnButton } from "../../components/returnButton";

export const CheckDateAdd = () => {
    const products = [
        {id: 1, nombre:"A", marca:"A", cantidad: 250, unidad:"g"},
        {id: 2, nombre:"B", marca:"B", cantidad: 500, unidad:"g"}
    ];
    
    return (
        <div className="dateAdd">
            <InfoBanner message="Estas a punto de agregar una lista de productos, recuerda verificar la fecha de caducidad de los productos que deseas agregar." size={100} />
            <div className="buttonTopLeft">
                    <ReturnButton />
                    <h1 className="titulo">Agregar Productos</h1>
            </div>
            <div className="cuadrado">
                <p>Estas por agregar los siguientes productos</p>
                <div className="tableContainer">
                    <table className="userTable">
                        <thead>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Unidad</th>
                            <th>Marca</th>
                            <th>Verificacion</th>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>{product.marca}</td>
                            <td>{product.cantidad}</td>
                            <td>{product.unidad}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};