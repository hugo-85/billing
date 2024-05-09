import { FC, ReactNode } from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SxProps } from "@mui/system";
import Link from "next/link";

const styles: SxProps = {
  backgroundColor: "#3e7ab5",
  "& svg": {
    color: "white",
  },
  "& span": {
    color: "white",
  },
};

interface MenuItemProps {
  keyItem: string;
  path: string;
  label: string;
  icon: ReactNode;
  activeItem: string;
  updateActiveItem: (key: string) => void;
}

const MenuItem: FC<MenuItemProps> = ({
  keyItem,
  path,
  label,
  icon,
  activeItem,
  updateActiveItem,
}) => {
  return (
    <Link
      href={path}
      onClick={() => updateActiveItem(keyItem)}
      prefetch={false}
    >
      <ListItemButton key={keyItem} sx={activeItem === keyItem ? styles : {}}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
      <Divider />
    </Link>
  );
};

export default MenuItem;
