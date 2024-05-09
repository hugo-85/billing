import { Dayjs } from "dayjs";

export type BillType = {
  id: number;
  amount: string;
  createdAt: string;
  name: string;
  phone: string;
  hour: string;
  sign: string;
  note: string;
  state: string;
  delivery_date: string;
};

export type BillsResType = {
  rows: BillType[];
  total: number;
};

export interface billFormType {
  id?: string | number;
  deliveryDate: Dayjs | null;
  amount: number;
  hour: string;
  name: string;
  phone: string;
  note: string;
  state: string;
}
