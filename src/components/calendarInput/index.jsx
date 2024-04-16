import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarInput.css"; // Archivo CSS para estilos personalizados

export function CalendarInput() {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleDateChange = (date) => {
    setDate(date);
    setInputText(formatDate(date));
    setShowCalendar(false);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputText(inputValue);
  };

  const handleBlur = () => {
    if (isValidDate(inputText) && inputText !== formatDate(date)) {
      setDate(new Date(inputText));
    }
  };

  const isValidDate = (inputValue) => {
    return true;
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div className="calendar-input-container">
      <div>
        <p>Fecha de Caducidad </p>
        <input
          value={inputText}
          type="text"
          className="calendar-input"
          placeholder="aaaa/mm/dd"
          onChange={handleInputChange}
          onBlur={handleBlur}
          onClick={toggleCalendar}
        />
      </div>

      {showCalendar && (
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="calendar-popup"
        />
      )}
    </div>
  );
}
