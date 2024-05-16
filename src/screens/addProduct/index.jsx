import React, { useState } from "react";
import { Guide } from "../../components/guide";
import { ReturnButton } from "../../components/returnButton";
import { TextInput } from "../../components/textInput";
import { CalendarInput } from "../../components/calendarInput";
import { GeneralButton } from "../../components/button";
import { formatDate } from "../../generalFunctions";
import { DropDown } from "../../components/dropDown";
import "./AddProduct.css";

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
  });

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
    fetch(`http://3.144.175.151:3000/alimentos/busqueda/nombre/total/${value}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error al obtener los alimentos");
      })
      .then((data) => {
        // Filtrar resultados para evitar duplicados
        const uniqueResults = data.filter(
          (result, index, self) =>
            index === self.findIndex((r) => r.a_nombre === result.a_nombre)
        );
        setSearchResults(uniqueResults); // Actualiza el estado con los resultados filtrados
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleSelectResult = (selectedResult) => {
    setFormData((prevData) => ({
      ...prevData,
      a_nombre: selectedResult.a_nombre,
    }));
    setSearchResults([]); // Limpia los resultados de la búsqueda después de seleccionar uno
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
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
      // Manejar el éxito de la inserción
      console.log("Alimento agregado correctamente");
    } catch (error) {
      console.error("Error al agregar el alimento:", error);
    }
  };
  return (
    <div className="addProduct">
      <div className="addProductTitle">
        <Guide message="Asegúrate de rellenar todos los campos. <3"></Guide>
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
            list="productOptions" // Referencia al ID del datalist
            autoComplete="off" // Desactiva el autocompletado nativo del navegador
          />

          <datalist id="productOptions">
            {" "}
            {/* El ID debe coincidir con el list del input */}
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
            value={formData.a_fechaCaducidad}
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
          textElement="Agregar"
          color="#5982C0"
          onClick={handleSubmit}
        ></GeneralButton>
      </div>
    </div>
  );
}
