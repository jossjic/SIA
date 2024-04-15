import React from 'react';
import PropTypes from 'prop-types';
import "./guide.css"

export function InfoBanner({ message }) {
  return (
    <div className="info-banner">
      <div className="info-icon">
        <i className="icon-placeholder"></i>
      </div>
      <div className="info-message">
        {/* Esto mostrará el mensaje pasado al componente */}
        {message}
      </div>
    </div>
  );
}

InfoBanner.propTypes = {
  message: PropTypes.string.isRequired
};
