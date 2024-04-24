import React from 'react';
import "./barrabusqueda.css";
import searchIcon from './search-icon.png';

export function barraBusqueda() {
    return (
        <div className="search-container">
            <input type="text" className="search-input" placeholder="Buscar..." />
            <button type="submit" className="search-button">
                <img src={searchIcon} alt="Buscar" />
            </button>
        </div>
    );
}