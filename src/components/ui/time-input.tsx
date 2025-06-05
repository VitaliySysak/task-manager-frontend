import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { Dayjs } from "dayjs";

interface Props {
  className?: string;
  onChange: (value: Dayjs | null) => void;
  value?: Dayjs | null;
  label: string;
}

export default function TimeInput({ className, onChange, value, label }: Props) {
  const darkTheme = createTheme({ palette: { mode: "dark" } });
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ m: 1 }}>
          <DateTimePicker autoFocus={false} value={value} onChange={onChange} label={label} />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
