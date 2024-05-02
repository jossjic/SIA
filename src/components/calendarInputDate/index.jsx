import React, { useState } from "react";
import Calendar from "react-calendar";
import { formatDate } from "../../generalFunctions";
import "react-calendar/dist/Calendar.css";
import "./CalendarInputDate.css";

export function CalendarInputDate({ name, value, onChange }) {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleDateChange = (date) => {
    setDate(date);
    setInputText(formatDate(date));
    setShowCalendar(false);
    if (onChange) {
      onChange({ target: { name, value: formatDate(date) } });
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputText(inputValue);
    if (isValidDate(inputValue)) {
      setDate(new Date(inputValue));
      if (onChange) {
        onChange(event);
      }
    }
  };

  const handleBlur = () => {
    if (isValidDate(inputText) && inputText !== formatDate(date)) {
      setDate(new Date(inputText));
      if (onChange) {
        onChange({ target: { name, value: inputText } });
      }
    }
  };

  const isValidDate = (inputValue) => {
    return /^\d{4}\/\d{2}\/\d{2}$/.test(inputValue);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="calendarD-inputD-containerD">
      <input
        value={inputText}
        name={name}
        type="text"
        className="calendarD-inputD"
        placeholder="aaaa-mm-dd"
        onChange={handleInputChange}
        onBlur={handleBlur}
        onClick={toggleCalendar}
      />

      {showCalendar && (
        <div className="calendarD-popupD-containerD">
          <Calendar
            locale="es"
            onChange={handleDateChange}
            value={date}
            className="calendarD-popupD"
          />
        </div>
      )}
    </div>
  );
}
