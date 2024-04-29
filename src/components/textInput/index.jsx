import React from "react";
import "./textInput.css";

export function TextInput({ label, placeholder, onChange, name, value }) {
  return (
    <div className="textInput">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
