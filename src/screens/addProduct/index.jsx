import React, { useEffect, useState } from "react";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { TextInput } from "../../components/textInput";
import { CalendarInput } from "../../components/calendarInput";
import { GeneralButton } from "../../components/button";
import { formatDate } from "../../generalFunctions";
import { DropDown } from "../../components/dropDown";
import { ConfirmationPopUp } from "../../components/confirmationPopUp";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";

export function AddProduct() {
  const [formData, setFormData] = useState({
    a_nombre: "",
    a_cantidad: "",
    a_stock: "",
    a_fechaSalida: null,
    a_fechaEntrada: formatDate(new Date()),
    a_fechaCaducidad: null,
    um_id: "g",
    m_id: 0,
    u_id: localStorage.getItem("userId"),
  });

  const [checkDate, setCheckDate] = useState(true);
  const [validationMessage, setValidationMessage] = useState(
    "Recuerda rellenar todos los campos obligatorios."
  );

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);
  const [removeCheck, setRemoveCheck] = useState(false);

  const [individualValidationMessage, setIndividualValidationMessage] =
    useState({
      productValidationMessage: "",
      stockValidationMessage: "",
      expirationDateValidationMessage: "",
      quantityValidationMessage: "",
    });
  function dataReset(name, value) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: `${value}`,
    }));
  }

  useEffect(() => {
    console.log(formData);
    console.log(validationMessage);
  }, [formData, validationMessage]);

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeName = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      a_nombre: value,
    }));

    if (value.trim() !== "") {
      fetch(
        `http://3.144.175.151:3000/alimentos/busqueda/nombre/total/${value}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Error al obtener los alimentos");
        })
        .then((data) => {
          if (data.length > 0) {
            const uniqueResults = data.filter(
              (result, index, self) =>
                index === self.findIndex((r) => r.a_nombre === result.a_nombre)
            );
            setSearchResults(uniqueResults);
          } else {
            setSearchResults([]);
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectResult = (selectedResult) => {
    setFormData((prevData) => ({
      ...prevData,
      a_nombre: selectedResult.a_nombre,
    }));
    setSearchResults([]);
  };

  const validateForm = () => {
    console.log("validating form", formData.a_nombre.trim());
    if (formData.a_nombre.trim() === "") {
      setValidationMessage("El nombre del producto es obligatorio.");
      setIndividualValidationMessage({
        productValidationMessage: "El nombre del producto es obligatorio.",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      console.log("nombre", formData.a_nombre);
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
    } //regex Cada palabra empezando por mayúscula, separadas por espacios. Se aplicará mayúsculas iniciales a cada palabra individual en caso de no tener.
    else if (!/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(formData.a_nombre)) {
      let words = formData.a_nombre.split(" ");
      let newWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      setFormData((prevData) => ({
        ...prevData,
        a_nombre: newWords.join(" "),
      }));
    }

    //validación stock, numero natural mayor a 0 menor a limite de int

    if (formData.a_stock.trim() === "") {
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
      dataReset("a_stock", 0);
      return false;
    } else if (parseInt(formData.a_stock) < 0) {
      setValidationMessage("El stock debe ser un número positivo.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "El stock debe ser un número positivo.",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      dataReset("a_stock", 0);
      return false;
    } else if (parseInt(formData.a_stock) > 2147483647) {
      setValidationMessage("El stock es muy grande.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "El stock es muy grande.",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      dataReset("a_stock", 0);
      return false;
    }

    //validación cantidad, decimal(13,3) mayor a 0 pueden ser decimales o enteros
    if (formData.a_cantidad.trim() === "") {
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
      dataReset("a_cantidad", 0);
      return false;
    } else if (parseFloat(formData.a_cantidad) < 0) {
      setValidationMessage("La cantidad debe ser un número positivo.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "La cantidad debe ser un número positivo.",
      });

      dataReset("a_cantidad", 0);
      return false;
    } else if (parseFloat(formData.a_cantidad) > 9999999999999.999) {
      setValidationMessage("La cantidad es muy grande.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "La cantidad es muy grande.",
      });
      dataReset("a_cantidad", 0);
      return false;
    }

    if (checkDate) {
      setValidationMessage("");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "",
        quantityValidationMessage: "",
      });
      return true;
    } else {
      setValidationMessage("La fecha de caducidad no es válida.");
      setIndividualValidationMessage({
        productValidationMessage: "",
        stockValidationMessage: "",
        expirationDateValidationMessage: "La fecha de caducidad no es válida.",
        quantityValidationMessage: "",
      });
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://3.144.175.151:3000/alimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el alimento");
      }

      console.log("Alimento agregado correctamente");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al agregar el alimento:", error);
    }
  };

  return (
    <div className="addProduct">
      <div className="addProductTitle">
        <Guide message={validationMessage}></Guide>
        <ReturnButton textElement="Agregar Producto"></ReturnButton>
      </div>

      <div className="addProductContainer">
        <div className="inputContainer">
          <TextInput
            label="Nombre del producto"
            placeholder="Ej. Lata de Atún"
            name="a_nombre"
            value={formData.a_nombre}
            onChange={handleChangeName}
            list="productOptions"
            autoComplete="off"
            errorMessage={individualValidationMessage.productValidationMessage}
          />

          <datalist id="productOptions">
            {searchResults.map((result, index) => (
              <option key={index} value={result.a_nombre} />
            ))}
          </datalist>

          <DropDown
            title="Marca (Opcional)"
            name="m_id"
            value={formData.m_id}
            onChange={handleChange}
            tableName="marcas"
            label="m_nombre"
            key={1}
            optional={true}
            cdr={true}
            removeCheck={removeCheck}
            setIsModalOpenRemove={setIsModalOpenRemove}
          />

          <TextInput
            label="Stock"
            placeholder="Ej. 10"
            name="a_stock"
            value={formData.a_stock}
            onChange={handleChange}
            errorMessage={individualValidationMessage.stockValidationMessage}
          />

          <CalendarInput
            name="a_fechaCaducidad"
            value={formData.a_fechaCaducidad}
            setCheckDate={setCheckDate}
            onChange={handleChange}
            setValidationMessage={setValidationMessage}
            setIndividualValidationMessage={setIndividualValidationMessage}
            errorMessage={
              individualValidationMessage.expirationDateValidationMessage
            }
          />

          <TextInput
            label="Cantidad"
            placeholder="Ej. 200"
            name="a_cantidad"
            value={formData.a_cantidad}
            onChange={handleChange}
            errorMessage={individualValidationMessage.quantityValidationMessage}
          />

          <DropDown
            title="Unidad de medida (para cantidad)"
            name="um_id"
            value={formData.um_id}
            onChange={handleChange}
            tableName="unidades-medida"
            label="um_nombre"
            key={2}
            cdr={false}
          />
        </div>

        <GeneralButton
          textElement="Agregar"
          color="#5982C0"
          onClick={handleSubmit}
        ></GeneralButton>
      </div>
      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp
            message="Se agregó el producto correctamente."
            answer1="Ok"
            isOpen={isModalOpen}
            closeModal={() => {
              setIsModalOpen(false), navigate("/adminPage");
            }}
          />
        </div>
      )}
      {isModalOpenRemove && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp
            message="¿Estás seguro de que deseas eliminar esta opción?"
            answer1="Eliminar"
            answer2="Cancelar"
            color1="#FF6565"
            color2="#5982C0"
            funct={() => setRemoveCheck(true)}
            isOpen={isModalOpenRemove}
            closeModal={() => setIsModalOpenRemove(false)}
          />
        </div>
      )}
    </div>
  );
}
