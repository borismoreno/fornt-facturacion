import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

export const SeleccionFecha = () => {
    const [startDate, setStartDate] = useState(new Date());
    var today = new Date();
    var minimo = new Date();
    minimo.setDate(today.getDate() - 30);
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            locale={es}
            minDate={minimo}
            maxDate={today}
            className="w-full border-b-2 pb-1 border-gray-200 focus:outline-none focus:border-indigo-300 mt-4 text-sm"
        />
    )
}
