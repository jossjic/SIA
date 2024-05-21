import React from "react";
import "./TextInput.css";

export function TextInput({
  label,
  placeholder,
  onChange,
  name,
  value,
  list,
  errorMessage,
}) {
  return (
    <div className="textInput">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        list={list}
      />
      <p className="errorMessage">{errorMessage}</p>
    </div>
  );
}
