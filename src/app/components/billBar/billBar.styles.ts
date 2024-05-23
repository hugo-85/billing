import { Paper, styled } from "@mui/material";

export const BillBarBox = styled(Paper)({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "20px",
  padding: "10px",
  gap: "20px",
  minWidth: "700px",
  maxWidth: "900px",
  "& > div": {
    flex: 0.3,
  },

  "& .MuiSelect-select": {
    color: "black",
  },

  "& .MuiButtonBase-root": {
    background: "#343434",
  },
});
