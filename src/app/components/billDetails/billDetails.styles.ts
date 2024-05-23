import { Box, styled } from "@mui/material";

export const BillDetailsBox = styled(Box)({
  "& input": {
    border: "none",
    background: "white",
    color: "black",
    padding: "0px",
    minWidth: "10px",
    width: "100%",
  },
  "& .MuiTableCell-root": {
    borderColor: "black",
    borderRight: "2px solid black",
  },

  "& .MuiTableRow-head": {
    borderBottom: "2px solid",

    "& .MuiTableCell-head": {
      padding: "5px",
      background: "#e0e0e0",
    },
  },
  "& .MuiTableBody-root": {
    "& .MuiTableRow-root": {
      borderBottom: "1px solid",
    },
  },
  "& .MuiTableCell-body": {
    padding: "0px",
    paddingLeft: "10px",
    paddingTop: "5px",
  },
});
