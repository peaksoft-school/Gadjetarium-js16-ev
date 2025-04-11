import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CustomInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f9f9f9",


    "& fieldset": {
      borderColor: "#d1d5db", 
    },

    "&:hover fieldset": {
      borderColor: "#a855f7", 
    },

    "&.Mui-focused fieldset": {
      borderColor: "#d946ef", 
      borderWidth: "2px",
    },

    "& input": {
      color: "#111827",
    },
  },

  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#ef4444 !important", 
    borderWidth: "2px",
  },
}));

export default function StyledInput({ error, ...props }) {
  return (
    <CustomInput
      fullWidth
      variant="outlined"
      error={Boolean(error)}
      helperText={error}
      {...props}
    />
  );
}
