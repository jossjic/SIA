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
    // Implement your validation logic here
    // For example, you could use regular expressions
    // to check if the input string matches the expected format
    return /^\d{4}\/\d{2}\/\d{2}$/.test(inputValue);
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
          locale="es"
          onChange={handleDateChange}
          value={date}
          className="calendar-popup"
        />
      )}
    </div>
  );
}
