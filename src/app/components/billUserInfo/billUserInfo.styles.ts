import { Box, styled } from "@mui/material";

export const BillUserInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px",
  borderBottom: "5px solid",
  "& > div": {
    display: "flex",
    alignItems: "baseline",
    gap: "5px",
    "& label": {
      fontWeight: 700,
      fontSize: "16px",
    },
  },
});
