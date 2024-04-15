import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function Calendar(){
    const [selectedDate, setSelectedDate] = useState(null);
    handleDateChange = (date) => {
        setSelectedDate(date);
    }
    return(
        <div>
            <h1>Calendar</h1>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MM/DD/YYYY"
            />
        </div>
    )
}
export default Calendar;