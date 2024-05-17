import React from "react";
import "./TextInputAdd.css";

export function TextInputAdd({ label, placeholder, onChange, name, value, list }) {
  return (
    <div className="textInputAdd">
      <label>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        list={list}
      />
    </div>
  );
}
