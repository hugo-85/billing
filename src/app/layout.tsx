import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, ThemeProvider } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import "./globals.css";
import styles from "./page.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Billing",
  description: "Simple billing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <CssBaseline /> */}
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box className={styles.mainDiv}>
              <aside className={styles.sideBar}>
                <Sidebar />
              </aside>
              <main className={styles.mainContent}>{children}</main>
            </Box>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
              theme="light"
            />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
