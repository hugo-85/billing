import { Container, styled } from "@mui/material";

export const BillContainer = styled(Container)({
  "& input": {
    border: "none",
    background: "white",
    color: "black",
  },
  "& textarea": {
    background: "white",
    color: "black",
  },
  "& th": {
    color: "black",
  },
  ".MuiPaper-root": {
    color: "black",
    background: "white",
  },
  "& .mainPaper": {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "700px",
    maxWidth: "900px",
  },
  "& .customText": {
    fontWeight: 700,
    fontSize: "16px",
  },
});
