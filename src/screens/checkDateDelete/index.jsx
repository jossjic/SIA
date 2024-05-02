import React, {useState, useEffect } from "react";
import "./checkDateDelete.css";
import { Guide } from '../../components/guide';
import { ReturnButton } from "../../components/returnButton";
import { ButtonSquare } from "../../components/buttonSquare";
import { GeneralButton } from '../../components/button';
import { SelectDateDelete } from '../../components/selectDateDelete';

export const CheckDateDelete = () => {
    const [showSelectDate, setShowSelectDate] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null); // Nuevo estado para el ID del producto seleccionado
    const [products, setProducts] = useState([]);
    const [dates, setDates] = useState({}); // Estado para guardar las fechas por producto

    const ids = [3, 4, 8]; // Tu arreglo de IDs


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
    
      const updateProductState = (productId, newState) => {
        console.log("Updating product state for product ID:", productId, "with new state:", newState);
        setProducts(prevProducts => {
            return prevProducts.map(product => {
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
          const datesObject = datesByProduct.reduce((acc, current) => ({...acc,...current }), {});
      
          setDates(datesObject);
        };
      
        fetchDates();
      }, []); // Dependencia vacía, solo se ejecuta una vez

      const handleButtonClick = (product) => {
        setSelectedProductId(product.a_id);
        setShowSelectDate(true);
      };

    const handleCancelSelectDate = () => {
        setShowSelectDate(false);
    };

    const handleConfirmButtonClick = () => {
        updateProductState(selectedProductId, true);
        setShowSelectDate(false);
    };

    const allProductsVerified = () => {
        return products.every(product => product.estado);
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
                            <th>Verificación</th>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.a_id}>
                                    <td>{product.a_nombre}</td>
                                    <td>{product.a_cantidad+' '+product.um_id}</td>
                                    <td>{product.m_id}</td>
                                    <td>
                                    <ButtonSquare textElement="v" color={product.estado ? "#00FF00" : "#E14040"} onClick={() => handleButtonClick(product)} disabled={product.estado}/>
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="botonesDelete">
                        <GeneralButton textElement="Cancelar" path="" color="#5982C0"/>
                        <GeneralButton textElement="Eliminar" path="" color={allProductsVerified() ? "#E14040" : "#8F938D"}/>
                    </div>
                </div>
            </div>
            {showSelectDate && (
                <div className="modalOverlay">
                    <div className="modalContent">
                        <SelectDateDelete dates={dates[selectedProductId]} onCancel={handleCancelSelectDate} onConfirm={handleConfirmButtonClick}/>
                    </div>
                </div>
            )}
        </div>
    );
};