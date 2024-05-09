import { ReactNode } from "react";

export type MenuItemType = {
  keyItem: string;
  path: string;
  label: string;
  icon: ReactNode;
  role?: string;
  subItems?: MenuItemType[];
};
