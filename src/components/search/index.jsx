import React, { useState } from "react";
import "./search.css";
import { Link } from "react-router-dom"; // Añade esta línea

export function SearchBar({
  onSearch,
  addCartNumber,
  deleteCartNumber,
  addActive,
  deleteActive,
  onDeleteSelected,
  onAddUser,
  searchType,
}) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setInputText(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(inputText);
    }
  };

  return (
    <div className="search-bar">
      <div className="addCart">
        <p className={addCartNumber === 0 ? "hidden" : "addCartNumber"}>
          {addCartNumber}
        </p>
        <button
          className={`icon-button add ${addActive ? "active-add" : ""}`}
          onClick={onAddUser}
        >
          ➕
        </button>
      </div>
      <input
        type="text"
        placeholder={
          searchType === 0
            ? "Buscando por producto..."
            : searchType === 1
            ? "Buscando por cantidad..."
            : searchType === 2
            ? "Buscando por marca..."
            : searchType === 3
            ? "Buscando por existencia..."
            : searchType === 4
            ? "Buscando por caducidad..."
            : "Buscando..."
        }
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={
          searchType === 0
            ? "search-bar-producto"
            : searchType === 1
            ? "search-bar-cantidad"
            : searchType === 2
            ? "search-bar-marca"
            : searchType === 3
            ? "search-bar-stock"
            : searchType === 4
            ? "search-bar-caducidad"
            : "search-bar"
        }
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
