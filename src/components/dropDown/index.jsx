import "./DropDown.css";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch(`http://3.144.175.151:3000/${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        // Agregar la opción "Sin marca" al principio del array si el campo es opcional
        if (optional) {
          setOptions([{ [name]: 0, [label]: "Sin marca" }, ...data]);
        } else {
          setOptions(data);
        }
      });
  }, [tableName, optional, label, name]);

  useEffect(() => {
    // Establecer el valor por defecto al valor del primer elemento del array
    if (options.length > 0 && value === undefined) {
      onChange({ target: { name, value: options[0][name] } });
    }
  }, [options, value, onChange, name]);

  return (
    <div className="dropDownContainer">
      <label>{title}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option[name]} value={option[name]}>
            {option[label]}
          </option>
        ))}
      </select>
    </div>
  );
}
