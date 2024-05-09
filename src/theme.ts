// src/theme.ts
"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    background: {
      paper: "#0d1117",
      default: "#0d1117",
    },
    primary: {
      main: "#fff",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#000207",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#03060a",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#0d1117",
        },
      },
    },
  },
});

export default theme;
