import React from 'react';
import PropTypes from 'prop-types';
import "./guide.css"

export function InfoBanner({ message, size }) {
  const defaultSize = 150;

  // Calcula los estilos en función del tamaño proporcionado o del tamaño por defecto
  const bannerHeight = size || defaultSize;
  const iconSize = bannerHeight * 0.9; // Ajusta el tamaño del icono 
  const messageFontSize = bannerHeight * 0.15; // Ajusta el tamaño del mensaje 

  return (
    <div className="info-banner" style={{ height: bannerHeight }}>
      <div className="info-icon" style={{ marginRight: iconSize * 0.18 }}>
        <i className="icon-placeholder" style={{ width: iconSize, height: iconSize }}></i>
      </div>
      <div className="info-message" style={{ fontSize: messageFontSize }}>
        {/* Esto mostrará el mensaje pasado al componente */}
        {message}
      </div>
    </div>
  );
}
InfoBanner.propTypes = {
  message: PropTypes.string.isRequired
};