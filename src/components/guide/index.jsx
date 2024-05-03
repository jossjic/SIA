import React from "react";
import PropTypes from "prop-types";
import "./guide.css";
import humanoIcon from "../../assets/img/humanIcon.svg";

export function Guide({ message }) {
  return (
    <div className="info-banner">
      <img src={humanoIcon} alt="Icono de humano" />
      <p>{message}</p>
    </div>
  );
}
Guide.propTypes = {
  message: PropTypes.string.isRequired,
};
