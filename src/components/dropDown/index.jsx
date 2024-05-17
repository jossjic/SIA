import "./DropDown.css";
import React, { useEffect, useState } from "react";
import editIcon from "../../assets/img/editIcon.svg";
import addIcon from "../../assets/img/addIcon.svg";

export function DropDown({
  value,
  onChange,
  name,
  tableName,
  label,
  title,
  optional,
}) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showCRD, setShowCRD] = useState(false);

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
    const selectedValue = parseInt(event.target.value, 10);
    if (!isNaN(selectedValue)) {
      onChange({ target: { name, value: selectedValue } });
    }
    setInputValue("");
  };

  const handleAddOption = () => {
    const newOption = { [name]: inputValue, [label]: inputValue };
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

  return (
    <div className="dropDownContainer">
      <div className="headerDropDownContainer">
        <label>{title}</label>
        <button className="editButtonCRD" onClick={() => setShowCRD(!showCRD)}>
          <img src={editIcon} alt="editIcon"></img>
        </button>
      </div>

      {showCRD && (
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
              <div key={option[name]} className="dropdownCRD-option">
                <span>{option[label]}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemoveOption(option)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <select name={name} value={value} onChange={handleSelectChange}>
        {filteredOptions.map((option) => (
          <option key={option[name]} value={option[name]}>
            {option[label]}
          </option>
        ))}
      </select>
    </div>
  );
}
