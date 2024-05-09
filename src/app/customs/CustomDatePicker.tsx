import { FC } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { Dayjs } from "dayjs";

/*
For more details and examples look https://mui.com/components/date-picker/

P R O P S
---------
id: id attribute of the html node.
value: value that's shown in the input.
label: label for the input.
variant: layout variant of the input, by default standard
sx: object with styles, should by of type SxProps.
requiered: if the input should be mark as requiered.
disable: make the input disabled, by default false
error: If true, the label is displayed in an error state.
helperText: text shown below the input, in case of error is gonna have the color 'error'
placeHolder: The short hint displayed in the input before the user enters a value.
fullwidth: If true, the input will take up the full width of its container.
size: size of the whole element.
margin: If dense or normal, will adjust vertical spacing of this and contained components.
handleChange: event that's control the change, should recive a parameter of type ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
*/

interface CustomDatePickerProps {
  id: string | number;
  value: Dayjs | null | undefined;
  label?: string;
  outsideLabel?: string;
  variant?: "standard" | "outlined" | "filled" | undefined;
  sx?: SxProps;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  fullWidth?: boolean;
  size?: "small" | "medium" | undefined;
  margin?: "none" | "normal" | "dense" | undefined;
  handleDateChanges?: (id: string | number) => (newValue: Dayjs | null) => void;
}

const CustomDatePicker: FC<CustomDatePickerProps> = ({
  id,
  value,
  label,
  variant,
  outsideLabel,
  sx,
  required,
  disabled,
  error = false,
  helperText,
  placeholder,
  fullWidth,
  size,
  margin,
  handleDateChanges,
}) => {
  const defaultStyles: SxProps = {
    ".MuiInputLabel-root": {
      zIndex: 1,
    },
    outsideLabelSx: {
      mb: "8px",
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {outsideLabel && (
        <Typography>{`${outsideLabel}${required ? "*" : ""}`}</Typography>
      )}
      <DatePicker
        label={outsideLabel ? "" : label}
        value={value}
        format="DD/MM/YYYY"
        disabled={disabled ? disabled : false}
        onChange={handleDateChanges ? handleDateChanges(id) : () => null}
        slotProps={{
          textField: {
            variant: variant ? variant : "standard",
            sx: sx || defaultStyles,
            required: required ? required : false,
            error: error,
            helperText: helperText,
            placeholder: placeholder,
            fullWidth: fullWidth,
            size: size || "medium",
            margin: margin || "none",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
