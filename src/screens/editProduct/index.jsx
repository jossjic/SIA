import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { TextInput } from "../../components/textInput";
import { CalendarInput } from "../../components/calendarInput";
import { GeneralButton } from "../../components/button";
import { formatDate } from "../../generalFunctions";
import { DropDown } from "../../components/dropDown";
import "./EditProduct.css";
import { CalendarInputDate } from "../../components/calendarInputDate";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";

export function EditProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      try {
        const response = await fetch(
          `http://3.144.175.151:3000/alimentos/${a_id}`
        );
        const productData = await response.json();
        setFormData({
          a_nombre: productData.a_nombre,
          a_cantidad: productData.a_cantidad,
          a_stock: productData.a_stock,
          // a_fechaSalida: productData.a_fechaSalida,
          a_fechaEntrada: formatDate(productData.a_fechaEntrada),
          a_fechaCaducidad: formatDate(productData.a_fechaCaducidad),
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

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await fetch(
        `http://3.144.175.151:3000/alimentos/${a_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al editar el alimento");
      }
      // Manejar el éxito de la edición
      console.log("Alimento editado correctamente");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al editar el alimento:", error);
    }
  };

  return (
    <div className="editProduct">
      <div className="editProductTitle">
        <Guide message="Asegúrate de rellenar todos los campos."></Guide>
        <ReturnButton textElement="Editar Producto Existente"></ReturnButton>
      </div>

      <div className="editProductContainer">
        <div className="inputContainer">
          <TextInput
            label="Nombre del producto"
            placeholder="Ej. Lata de Atún"
            name="a_nombre"
            value={formData.a_nombre}
            onChange={handleChange}
          />

          <DropDown
            title="Marca (Opcional)"
            name="m_id"
            value={formData.m_id}
            onChange={handleChange}
            tableName="marcas"
            label="m_nombre"
            key={1}
            optional={true}
          />

          <TextInput
            label="Stock"
            placeholder="Ej. 10"
            name="a_stock"
            value={formData.a_stock}
            onChange={handleChange}
          />

          <CalendarInput
            name="a_fechaCaducidad"
            value={
              formData.a_fechaCaducidad instanceof Date
                ? formatDate(formData.a_fechaCaducidad)
                : formData.a_fechaCaducidad
            }
            onChange={handleChange}
          />

          <TextInput
            label="Cantidad"
            placeholder="Ej. 200"
            name="a_cantidad"
            value={formData.a_cantidad}
            onChange={handleChange}
          />

          <DropDown
            title="Unidad de medida (para cantidad)"
            name="um_id"
            value={formData.um_id}
            onChange={handleChange}
            tableName="unidades-medida"
            label="um_nombre"
            key={2}
          />
        </div>

        <GeneralButton
          textElement="Guardar"
          color="#5982C0"
          onClick={handleSubmit}
        ></GeneralButton>
      </div>
      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp
            message="Alimento editado correctamente"
            answer1="Ok"
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
