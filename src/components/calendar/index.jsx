import { DatePicker } from '@mui/x-date-pickers'
import React from 'react';
import { TextField } from '@mui/material'
import "./calendar.css";

export const Calendar = () => {
    const [dataForm, setDataForm] = React.useState<{
          date: Date | null,
      }>({
        date: new Date(),
      })

    return (
        <div>
            <DatePicker
                disableFuture
                label='Responsive'
                openTo='year'
                views={['year', 'month', 'day']}
                value={dataForm.date}
                onChange={(newValue) => {
                    setDataForm({...dataForm, date: newValue })
                }}
                renderInput = {(params) => <TextField {...params} />}
            />
        </div>
    )
}
