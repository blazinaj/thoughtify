import { DateTimePicker as MUIDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';

/**
 * Date picker component
 * @param onChange
 * @param defaultValue
 * @param value
 * @param dateConfig
 * @param fieldName
 * @returns {JSX.Element}
 * @constructor
 */
const DatePicker = ({ onChange, defaultValue, value = defaultValue, dateConfig = {}, fieldName }) => (
  <div data-testid={`custom_input_date${fieldName}`}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MUIDatePicker
        id={`custom_input_date${fieldName}`}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Select a Date and Time"
        showTimeInput
        minDate={dateConfig?.minDate}
        maxDate={dateConfig?.maxDate}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        value={!Number.isNaN(new Date(value).getTime()) ? new Date(value) : new Date(defaultValue)}
        onChange={(date) => {
          onChange && onChange(date);
        }}
        renderInput={(inputProps) => <TextField {...inputProps} variant="outlined" />}
        {...dateConfig}
      />
    </LocalizationProvider>
  </div>
);

export default DatePicker;
