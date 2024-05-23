import { Box, styled } from "@mui/material";

export const BillHeaderBox = styled(Box)({
  display: "flex",
  borderBottom: "3px solid",

  "& .headerLogo": {
    flex: 0.6,
    "& .logo": {
      "& img": {
        width: "300px",
      },
    },
    "& .infoLabel": {
      borderTop: "3px solid",
      borderLeft: "3px solid",
      borderRight: "3px solid",
      width: "200px",
      background: "#e0e0e0",
    },
  },

  "& .headerData": {
    flex: 0.4,
    display: "flex",
    flexDirection: "column",

    "& .MuiIconButton-root": {
      color: "black",
      opacity: "0.6",
    },

    "& .MuiInputBase-input": {
      background: "#f7f79c",
      color: "black",
    },

    "& .staticData": {
      display: "flex",
      "& span": {
        flex: 0.5,
      },
    },
    "& .staticData2": {
      display: "flex",
      alignItems: "center",
      marginBottom: "3px",

      "& span": {
        flex: 0.5,
      },
      "& .idBill": {
        border: "3px solid",
        textAlign: "center",
        background: "#add9e9",
        minHeight: "31px",
      },
    },
    "& .mid": {
      display: "flex",

      "& > div": {
        flex: 0.5,
        border: "3px solid",
        background: "#f7f79c",
      },

      "& .customText": {
        display: "flex",
        alignItems: "center",
        borderRight: "0px",
      },
    },
    "& .mid2": {
      display: "flex",

      "& > div": {
        flex: 0.5,
        borderLeft: "3px solid",
        borderRight: "3px solid",
        borderBottom: "3px solid",
        background: "#f7f79c",
      },

      "& .customText": {
        display: "flex",
        alignItems: "center",
        borderRight: "0px",
      },

      "& input": {
        backgroundColor: "transparent",
        border: "none",
        width: "100px",
        "&:focus-visible": {
          outline: "none",
        },
      },
    },
  },
  "& .full": {
    width: "100%",
    height: "37px",
    background: "#f7f79c",
    borderLeft: "3px solid",
    borderRight: "3px solid",
    borderBottom: "3px solid",
    textAlign: "center",
  },
});
