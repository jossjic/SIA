import React, { useState, useRef } from "react";
import { Guide } from "../guide";
import "./SlidingSideBar.css";
import returnImage from "../../assets/img/returnImage.png";
import { Ordenamiento } from "../ordenamiento";

export function SlidingSideBar() {
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    if (!expanded && sidebarRef.current && sidebarRef.current.contains(event.target)) {
      setExpanded(true);
    } else if (expanded) {
      event.stopPropagation();
    }
  };

  return (
    <div className={`sidebar ${expanded ? "expanded" : ""}`} onClick={toggleSidebar}>
      <div className="bar" ref={sidebarRef}></div>
      <img
        className="sidebar-image"
        src={returnImage}
        alt="Return"
        style={{
          transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
          paddingLeft: expanded ? "0px" : "12%",
          paddingRight: expanded ? "2%" : "0px",
        }}
        onClick={toggleSidebar} 
      />
      <div className={`additional-content ${expanded ? "expanded" : ""}`} onClick={handleClick}>
        <div>
          <Guide
            message="Selecciona un filtro para ver solo un tipo de alimentos u ordenalos como gustes"
            size={80}
          />
        </div>
        <div className="title-container">
          <p className="title">FILTRAR ALIMENTOS</p>
          <p className="title">ESTADO</p>
        </div>
        <Ordenamiento message="Mostrar solo alimentos caducados"></Ordenamiento>
        <Ordenamiento message="Mostrar solo alimentos próximos a caducar"></Ordenamiento>
        <Ordenamiento message="Mostrar solo alimentos con disponibilidad"></Ordenamiento>
        <Ordenamiento message="Mostrar solo alimentos sin disponibilidad"></Ordenamiento>
        <div className="title-container">
          <p className="title">ORDENAR ALIMENTOS</p>
          <p className="title">ESTADO</p>
        </div>
        <Ordenamiento message="Fecha de caducidad (de más cercana a menos cercana)"></Ordenamiento>
        <Ordenamiento message="Fecha de caducidad (de menos cercana a más cercana)"></Ordenamiento>
        <Ordenamiento message="Fecha de registro (de más cercana a menos cercana)"></Ordenamiento>
        <Ordenamiento message="Fecha de registro (de menos cercana a más cercana)"></Ordenamiento>
        <Ordenamiento message="Orden alfabético"></Ordenamiento>
      </div>
    </div>
  );
}