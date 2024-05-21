import "./DropDown.css";
import React, { useEffect, useState } from "react";
import editIcon from "../../assets/img/editIcon.svg";
import addIcon from "../../assets/img/addIcon.svg";
import trashIcon from "../../assets/img/trashIcon.svg";
import { ConfirmationPopUp } from "../confirmationPopUp";

export function DropDown({
  value,
  onChange,
  name,
  tableName,
  label,
  title,
  optional,
  cdr,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showCRD, setShowCRD] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionToRemove, setOptionToRemove] = useState({});

  useEffect(() => {
    fetch(`http://3.144.175.151:3000/${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        if (optional) {
          setOptions([{ [name]: 0, [label]: "Sin marca" }, ...data]);
        } else {
          setOptions(data);
        }
      });
  }, [tableName, optional, label, name]);

  useEffect(() => {
    if (options.length > 0 && value === undefined) {
      onChange({ target: { name, value: options[0][name] } });
    }
  }, [options, value, onChange, name]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    onChange({ target: { name, value: selectedValue } });
  };

  const handleAddOption = () => {
    //validacion de campos vacios y 30 caracteres maximo, todas las palabras empezando con mayuscula, para las mayuculas el sistema hace el formato en automatico

    if (inputValue === "") {
      alert("El campo no puede estar vacío");
      return;
    }
    if (inputValue.length > 30) {
      alert("El campo no puede tener más de 30 caracteres");
      return;
    }
    //formato, cada palabra empieza con mayuscula, si no lo cumple cambiar a mayusculas el input antes de enviarlo
    const words = inputValue.split(" ");
    const formattedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    const formattedInputValue = formattedWords.join(" ");
    //validacion de que no exista la opcion en la lista
    const optionExists = options.some(
      (option) =>
        option[label].toLowerCase() === formattedInputValue.toLowerCase()
    );
    if (optionExists) {
      alert("La opción ya existe");
      return;
    }

    const newOption = {
      [name]: formattedInputValue,
      [label]: formattedInputValue,
    };
    setOptions([...options, newOption]);
    fetch(`http://3.144.175.151:3000/${tableName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOption),
    }).then((response) => {
      if (response.ok) {
        console.log("New option added successfully");
        fetch(`http://3.144.175.151:3000/${tableName}`)
          .then((response) => response.json())
          .then((data) => {
            if (optional) {
              setOptions([{ [name]: 0, [label]: "Sin marca" }, ...data]);
            } else {
              setOptions(data);
            }
          });
      }
    });
  };

  const handleRemoveOption = (optionToRemove) => {
    setOptions(
      options.filter((option) => option[name] !== optionToRemove[name])
    );
    fetch(`http://3.144.175.151:3000/${tableName}/${optionToRemove[name]}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        console.log("Option removed successfully");
      }
    });
  };

  const filteredOptions = options.filter((option) =>
    option[label].toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleEditButton = () => {
    setShowCRD(!showCRD);
    setInputValue("");
  };

  const handleSpanClick = (option) => {
    onChange({ target: { name, value: option[name] } });
    setShowCRD(false);
  };

  return (
    <div className="dropDownContainer">
      <div className="headerDropDownContainer">
        <label>{title}</label>
        {cdr && (
          <button className="editButtonCRD" onClick={handleEditButton}>
            <img src={editIcon} alt="editIcon"></img>
          </button>
        )}
      </div>

      {cdr && showCRD && (
        <div className="dropdown-crd">
          <div className="dropdown-crd-header">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Buscar o agregar..."
            />
            <button onClick={handleAddOption}>
              <img src={addIcon} alt="addIcon"></img>
            </button>
          </div>

          <div className="dropdownCRD-options">
            {filteredOptions.map((option) => (
              <div
                key={option[name]}
                className="dropdownCRD-option"
                onClick={() => handleSpanClick(option)}
              >
                <span className="option-span">{option[label]}</span>
                <button
                  className="remove-button"
                  onClick={() => {
                    setIsModalOpen(true), setOptionToRemove(option);
                  }}
                >
                  <img src={trashIcon} alt="trashIcon"></img>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <select name={name} value={value} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option[name]} value={option[name]}>
            {cdr ? option[label] : option[label] + " (" + option[name] + ")"}
          </option>
        ))}
      </select>
      {isModalOpen && (
        <div className="modalOverlayConf">
          <ConfirmationPopUp
            message="¿Estás seguro de que deseas eliminar esta opción?"
            answer1="Eliminar"
            answer2="Cancelar"
            funct={() => handleRemoveOption(optionToRemove)}
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
