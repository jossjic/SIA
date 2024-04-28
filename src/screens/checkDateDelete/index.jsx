import React, {useState} from "react";
import "./checkDateDelete.css";
import { Guide } from '../../components/guide';
import { ReturnButton } from "../../components/returnButton";
import { ButtonSquare } from "../../components/buttonSquare";
import { GeneralButton } from '../../components/button';
import { SelectDateDelete } from '../../components/selectDateDelete';

export const CheckDateDelete = () => {
    const products = [
        {id: 1, nombre:"Apocosipa12345aaaaaaaaaa", marca:"NA", cantidad: 250, unidad:"g"},
        {id: 2, nombre:"B", marca:"La Costeña", cantidad: 500, unidad:"g"},
        {id: 3, nombre:"Shifu", marca:"Del Valle", cantidad: 300, unidad:"g"}
    ];

    // Función que se ejecutará cuando se haga clic en el botón cuadrado
    const [showSelectDateD, setShowSelectDateD] = useState(false);

    // Función que se ejecutará cuando se haga clic en el botón cuadrado
    const handleButtonClickD = () => {
        setShowSelectDateD(true);
    };
    
    return (
        <div className="dateDelete">
            <div className="mensajeD">
                <Guide message="Estas a punto de eliminar una lista de productos, recuerda verificar la fecha de caducidad de los productos que deseas eliminar." size={100} />
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
                            <th>Verificacion</th>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>{product.cantidad+' '+product.unidad}</td>
                            <td>{product.marca}</td>
                            <td>
                                <ButtonSquare textElement="v" color="#74E140" onClick={handleButtonClickD}/>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="botonesDelete">
                        <GeneralButton textElement="Cancelar" path="" color="#5982C0"/>
                        <GeneralButton textElement="Eliminar" path="" color="#E14040"/>
                    </div>
                </div>
            </div>
            {showSelectDateD && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <SelectDateDelete />
                    </div>
                </div>
            )}
        </div>
    );
};