import { Box, styled } from "@mui/material";

export const BillFooterBox = styled(Box)({
  display: "flex",
  height: "70px",
  alignItems: "center",
  borderTop: "2px solid",
  "& > div": {
    borderRight: "2px solid",
    height: "100%",
    minWidth: "80px",
  },
  "& .title": {
    width: "84px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  "& .note": {
    width: "536px",
    padding: "5px",
    "& textarea": {
      width: "100%",
      height: "100%",
      resize: "none",
      border: "none",
    },
  },
  "& .totals": {
    width: "250px",
    display: "flex",
    flexWrap: "wrap",
    flexShrink: 0,

    "& .total-title": {
      borderRight: "2px solid",
      textAlign: "left",
      fontSize: "14px",
      fontWeight: 900,
    },
    "& > div": {
      width: "50%",
      borderBottom: "2px solid",
      paddingRight: "5px",
      paddingLeft: "5px",
    },

    "& input": {
      textAlign: "right",
    },
  },
  "& input": {
    border: "none",
    padding: "0px",
    minWidth: "10px",
    width: "100%",
  },
});
