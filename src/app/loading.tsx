import { Stack } from "@mui/material";
import SvgLogo from "./components/Logo/Logo";

export default function LoadingPage() {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      gap={"20px"}
      height={"100%"}
    >
      <SvgLogo fill="#ffffff" />
      <h3>Loading ....</h3>
    </Stack>
  );
}
