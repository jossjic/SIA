import React, { useState } from "react";
import "./search.css";

export function SearchBar({
  onSearch,
  addCartNumber,
  deleteCartNumber,
  addActive,
  deleteActive,
  onDeleteSelected
}) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setInputText(searchText);
    // Call the onSearch function with the updated search text
    onSearch(searchText);
  };

  return (
    <div className="search-bar">
      <div className="addCart">
        <p className={addCartNumber === 0 ? "hidden" : "addCartNumber"}>
          {addCartNumber}
        </p>
        <button className={`icon-button add ${addActive ? "active-add" : ""}`}>
          ➕
        </button>
      </div>
      <input
        type="text"
        placeholder="Buscar..."
        value={inputText}
        onChange={handleInputChange}
      />
      <div className="deleteCart">
        <p className={deleteCartNumber === 0 ? "hidden" : "deleteCartNumber"}>
          {deleteCartNumber}
        </p>
        <button
          className={`icon-button delete ${
            deleteActive ? "active-delete" : ""
          }`}
          onClick={onDeleteSelected}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
