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
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import { useNavigate } from "react-router-dom";

export function EditProduct() {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
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
  const [validationMessage, setValidationMessage] = useState("");
  const [individualValidationMessage, setIndividualValidationMessage] =
    useState({
      productValidationMessage: "",
      stockValidationMessage: "",
      expirationDateValidationMessage: "",
      quantityValidationMessage: "",
    });

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(`http://localhost:3001/alimentos/${a_id}`);
        const productData = await response.json();
        setFormData({
          a_nombre: productData.a_nombre,
          a_cantidad: productData.a_cantidad,
          a_stock: productData.a_stock,
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

  const validateForm = () => {
    if (formData.a_nombre.trim() == "") {
      setValidationMessage("El nombre del producto es obligatorio.");
      setIndividualValidationMessage({
        productValidationMessage: "El nombre del producto es obligatorio.",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      return false;
    } else if (formData.a_nombre.length > 40) {
      setValidationMessage(
        "El nombre del producto es muy largo (máximo 40 caracteres)."
      );
      setIndividualValidationMessage({
        productValidationMessage:
          "El nombre del producto es muy largo (máximo 40 caracteres).",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      return false;
    } else if (formData.a_nombre.length < 2) {
      setValidationMessage(
        "El nombre del producto es muy corto (mínimo 2 caracteres)."
      );
      setIndividualValidationMessage({
        productValidationMessage:
          "El nombre del producto es muy corto (mínimo 2 caracteres).",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      return false;
    } else if (!/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(formData.a_nombre)) {
      let words = formData.a_nombre.split(" ");
      let newWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );
      setFormData((prevData) => ({
        ...prevData,
        a_nombre: newWords.join(" "),
      }));
    }

    if (formData.a_stock == "" || formData.a_stock == null) {
      setValidationMessage("El stock es obligatorio.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "El stock es obligatorio.",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      return false;
    } else if (!Number.isInteger(parseFloat(formData.a_stock))) {
      setValidationMessage("El stock debe ser un número entero.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "El stock debe ser un número entero.",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      setFormData((prevData) => ({ ...prevData, a_stock: 0 }));
      return false;
    } else if (parseInt(formData.a_stock) < 0) {
      setValidationMessage("El stock debe ser un número positivo.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "El stock debe ser un número positivo.",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      setFormData((prevData) => ({ ...prevData, a_stock: 0 }));
      return false;
    } else if (parseInt(formData.a_stock) > 2147483647) {
      setValidationMessage("El stock es muy grande.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "El stock es muy grande.",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      setFormData((prevData) => ({ ...prevData, a_stock: 0 }));
      return false;
    }

    if (formData.a_cantidad == "" || formData.a_cantidad == null) {
      setValidationMessage("La cantidad es obligatoria.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "La cantidad es obligatoria.",
      });
      return false;
    } else if (!/^\d{1,13}(\.\d{1,3})?$/.test(formData.a_cantidad)) {
      setValidationMessage(
        "La cantidad no es válida (máximo 13 enteros y 3 decimales)."
      );
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage:
          "La cantidad no es válida (máximo 13 enteros y 3 decimales).",
      });
      setFormData((prevData) => ({ ...prevData, a_cantidad: 0 }));
      return false;
    } else if (parseFloat(formData.a_cantidad) < 0) {
      setValidationMessage("La cantidad debe ser un número positivo.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "La cantidad debe ser un número positivo.",
      });
      setFormData((prevData) => ({ ...prevData, a_cantidad: 0 }));
      return false;
    } else if (parseFloat(formData.a_cantidad) > 9999999999999.999) {
      setValidationMessage("La cantidad es muy grande.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "La cantidad es muy grande.",
      });
      setFormData((prevData) => ({ ...prevData, a_cantidad: 0 }));
      return false;
    }

    setValidationMessage("");
    setIndividualValidationMessage({
      productValidationMessage: "",
      stockValidationMessage: "",
      expirationDateValidationMessage: "",
      quantityValidationMessage: "",
    });
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(`http://localhost:3001/alimentos/${a_id}`, {
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

      const stockBody = {
        a_id: a_id,
        u_id: userId,
        actionType: 2,
        quantity: formData.a_stock,
      };

      const stockResponse = await fetch(
        "http://localhost:3001/usuarios/stock/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(stockBody),
        }
      );

      if (!stockResponse.ok) {
        throw new Error("Error al editar el stock");
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al editar el alimento o el stock:", error);
    }
  };

  return (
    <div className="editProduct">
      <div className="editProductTitle">
        <Guide message="Asegúrate de rellenar todos los campos." />
        <ReturnButton textElement="Editar Producto Existente" />
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

        {validationMessage && (
          <div className="errorMessage">{validationMessage}</div>
        )}

        <br />
        <br />
        <GeneralButton
          textElement="Guardar"
          color="#5982C0"
          onClick={handleSubmit}
        />
      </div>

      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp
            message="Alimento editado correctamente"
            answer1="Ok"
            isOpen={isModalOpen}
            closeModal={() => {
              setIsModalOpen(false);
              navigate("/adminPage");
            }}
          />
        </div>
      )}
    </div>
  );
}
