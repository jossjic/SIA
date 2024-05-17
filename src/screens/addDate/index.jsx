import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { TextInput } from "../../components/textInput";
import { CalendarInput } from "../../components/calendarInput";
import { GeneralButton } from "../../components/button";
import { formatDate } from "../../generalFunctions";
import { DropDown } from "../../components/dropDown";
import "./AddDate.css";
import { CalendarInputDate } from "../../components/calendarInputDate";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { ButtonSquare, ButtonCircle } from "../../components/buttonSquare";
import { SelectDateAddDate } from '../../components/selectDate';
import { useNavigate } from "react-router-dom";

export function AddDate() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let navigate = useNavigate();
  const { a_id } = useParams();
  const [formData, setFormData] = useState({
    a_nombre: "",
    a_cantidad: "",
    a_stock: "",
    a_fechaSalida: null,
    a_fechaEntrada: null,
    a_fechaCaducidad: null,
    um_id: "g",
    m_id: 0,
  });

  useEffect(() => {
    async function fetchProductData() {
      console.log(a_id);
      try {
        const response = await fetch(`http://3.144.175.151:3000/alimentos/${a_id}`);
        if (!response.ok) {
          throw new Error("Error fetching product data");
        }
        const productData = await response.json();
        setFormData({
          a_nombre: productData.a_nombre,
          a_cantidad: productData.a_cantidad,
          a_stock: productData.a_stock,
          a_fechaSalida: productData.a_fechaSalida ? new Date(productData.a_fechaSalida) : null,
          a_fechaEntrada: productData.a_fechaEntrada ? new Date(productData.a_fechaEntrada) : null,
          a_fechaCaducidad: productData.a_fechaCaducidad ? new Date(productData.a_fechaCaducidad) : null,
          um_id: productData.um_id,
          m_id: productData.m_id,
        });
        console.log(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchProductData();
  }, [a_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await fetch(`http://3.144.175.151:3000/alimentos/${a_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al editar el alimento");
      }
      console.log("Alimento editado correctamente");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al editar el alimento:", error);
    }
  };

  return (
    <div className="addDate">
        <div className="mensajeDA">
            <Guide message="Estás a punto de agregar una lista de productos. Recuerda verificar la fecha de caducidad de los productos que deseas agregar." size={100} />
        </div>
        <div className="buttonBackDA">
            <ReturnButton />
            <h1 className="titulo">Agregar Fecha de Caducidad</h1>
        </div>

        <div className="infoDA">
            <h2>Alimento seleccionado: </h2>
            <h3>{formData.a_nombre + "    " + formData.a_cantidad + " " + formData.um_id + "    " + formData.m_id}</h3>
        </div>

        <div className="tablaGeneral">
            <table className="tabla1">
                <tr>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                </tr>
                <tr>
                    <td>
                        <CalendarInputDate
                        name="a_fechaCaducidad"
                        value={formData.a_fechaCaducidad}
                        onChange={handleChange}
                        />
                    </td>
                    <td>
                        <TextInput
                        placeholder="Stock. Ej. 10"
                        name="a_stock"
                        value={formData.a_stock}
                        onChange={handleChange}
                        />
                    </td>
                </tr>
            </table>

            <ButtonCircle textElement="+" color="#5982C0" />
        </div>

        <div className="botonesAddDA">
            <GeneralButton textElement="Cancelar" onClick={() => {
                navigate("/AdminPage");
                }}
                color="#E14040" />
            <GeneralButton 
                textElement="Agregar" 
                color="#00FF00"  />
        </div>
      
    </div>
  );
}
