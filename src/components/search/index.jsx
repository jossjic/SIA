import React, { useState } from "react";
import "./search.css";

export function SearchBar({ onSearch }) {
  const [inputText, setInputText] = useState("");
  const [isAddActive, setAddActive] = useState(false);
  const [isDeleteActive, setDeleteActive] = useState(false);

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setInputText(searchText);
    // Llama a la función onSearch con el texto de búsqueda actualizado
    onSearch(searchText);
  };

  return (
    <div className="search-bar">
      <button
        className={`icon-button add ${isAddActive ? "active-add" : ""}`}
        onMouseDown={() => setAddActive(true)}
        onMouseUp={() => setAddActive(false)}
        onMouseLeave={() => setAddActive(false)}
      >
        +
      </button>
      <input
        type="text"
        placeholder="Buscar..."
        value={inputText}
        onChange={handleInputChange}
      />
      <button
        className={`icon-button delete ${
          isDeleteActive ? "active-delete" : ""
        }`}
        onMouseDown={() => setDeleteActive(true)}
        onMouseUp={() => setDeleteActive(false)}
        onMouseLeave={() => setDeleteActive(false)}
      >
        🗑️
      </button>
    </div>
  );
}
