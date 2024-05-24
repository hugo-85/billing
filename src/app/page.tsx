import { Stack } from "@mui/material";
import SvgLogo from "./components/Logo/Logo";

export default function Home() {
  return (
    <Stack justifyContent={"center"} height={"100%"}>
      <SvgLogo fill="#ffffff" />
    </Stack>
  );
}
