"use client";

import { FC, useState, ChangeEvent, useEffect } from "react";
import { Paper } from "@mui/material";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { clearCache } from "@/app/actions";
import BillFooter from "../billFooter/BillFooter";
import BillUserInfo from "../billUserInfo/BillUserInfo";
import BillDetails from "../billDetails/BillDetails";
import BillHeader from "../billHeader/BillHeader";
import { billFormType } from "@/app/types/bills";
import BillBar from "../billBar/BillBar";
import { BillContainer } from "./bill.styles";
import { initializeDetails } from "@/app/utils/helpers";

interface updatedType {
  deliveryDate?: Dayjs | null;
  amount?: number;
  hour?: string;
  name?: string;
  phone?: string;
  note?: string;
  state?: string;
  sign?: number;
  details?: any[];
}

interface BillProps {
  billData?: any;
}

const Bill: FC<BillProps> = ({ billData }) => {
  const billDate = billData?.createdAt ? dayjs(billData.createdAt) : dayjs();
  const [newId, setNewId] = useState<number | null>(null);
  const [values, setValues] = useState<billFormType>({
    deliveryDate: null,
    amount: 0,
    hour: "",
    name: "",
    phone: "",
    note: "",
    state: "ARCHIVADO",
  });
  const [updated, setUpdated] = useState<updatedType | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [sign, setSign] = useState(0);

  useEffect(() => {
    if (billData?.id) {
      setValues({
        amount: billData.amount,
        deliveryDate: dayjs(billData.delivery_date) || null,
        hour: billData.hour,
        name: billData.name,
        phone: billData.phone,
        note: billData.note,
        state: billData?.state || "ARCHIVADO",
      });

      if (billData.sign) setSign(billData.sign);
    }

    setRows(initializeDetails(billData?.details || []));
  }, []);

  const clearAmount = (value: string) => {
    return value.replace(/[^0-9.]/g, "").trim() || "0";
  };

  const updateValues = (name: string, value: string | Dayjs) => {
    setValues({ ...values, [name]: value });
    setUpdated({ ...updated, [name]: value });
  };

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    updateValues(e.target.name, e.target.value);
  };

  const handleChangeSign = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value !== "$ ") {
      const value = clearAmount(e.target.value);
      setSign(parseInt(value));
      setUpdated({ ...updated, sign: parseInt(value) });
    } else {
      setSign(0);
      setUpdated({ ...updated, sign: 0 });
    }
  };

  const handleChangeRow = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let id: number = parseInt(e.target.id);
    let name = e.target.name;
    let value = e.target.value;

    let auxRows = [...rows];
    auxRows[id][name] = value;
    setRows(auxRows);
  };

  const handleChangeRowNumber = (
    index: number,
    field: string,
    value: number
  ) => {
    let auxRows = [...rows];
    auxRows[index][field] = value;
    setRows(auxRows);
  };

  const save = async () => {
    const details = rows.filter(
      (d) => d.quantity > 0 && d.price > 0 && d.details !== ""
    );

    if (details.length === 0) {
      toast(
        "La factura debe tener al menos un detalle con importe mayor a $0",
        {
          type: "error",
        }
      );
      return;
    }

    const uncompletedRows = rows.filter(
      (d) =>
        (d.details !== "" && d.price == 0) ||
        (d.details !== "" && d.quantity === 0) ||
        (d.price > 0 && d.details === "") ||
        (d.price > 0 && d.quantity === 0) ||
        (d.quantity > 0 && d.details === "") ||
        (d.quantity > 0 && d.price === 0)
    );

    if (uncompletedRows.length > 0) {
      toast("Hay detalles sin completar", {
        type: "error",
      });
      return;
    }

    if (values.name === "") {
      toast("Debe ingresar un nombre", {
        type: "error",
      });
      return;
    }

    if (values.phone === "") {
      toast("Debe ingresar un telefono", {
        type: "error",
      });
      return;
    }

    if (!values.deliveryDate) {
      toast("Debe ingresar una fecha de entrega", {
        type: "error",
      });
      return;
    }

    if (!newId && !billData?.id) {
      try {
        const resp = await axios.post("/api/bill", {
          ...values,
          details,
          createdAt: billDate.format("YYYY-MM-DD"),
          deliveryDate: values.deliveryDate.format("YYYY-MM-DD"),
          sign,
        });

        if (resp.status === 200) {
          toast("Factura creada", {
            type: "success",
          });
          setNewId(resp.data.id);
          clearCache("bills-tag");
        } else
          toast("Error creando factura", {
            type: "error",
          });
      } catch (e: any) {
        toast("Error creando factura", {
          type: "error",
        });
      }
    } else if (updated || details.length > 0) {
      const id = newId || billData.id;
      let newData: any = {
        ...updated,
        details,
      };

      if (updated?.deliveryDate)
        newData = {
          ...newData,
          deliveryDate: values.deliveryDate.format("YYYY-MM-DD"),
        };

      try {
        const resp = await axios.put(`/api/bill?id=${id}`, newData);

        if (resp.status === 200) {
          toast("Factura actualizada", {
            type: "success",
          });
          setUpdated(null);
          clearCache("bills-tag");
        } else {
          toast("Error actualizando factura", {
            type: "error",
          });
        }
      } catch (e: any) {
        const error: AxiosError = e;
        toast(error.response?.data as string, {
          type: "error",
        });
      }
    }
  };

  const clearData = () => {
    setValues({
      deliveryDate: null,
      amount: 0,
      hour: "",
      name: "",
      phone: "",
      note: "",
      state: "ARCHIVADO",
    });

    setUpdated(null);
    setNewId(null);
    setSign(0);

    const aux = [...Array(10)].map(() => {
      return {
        id: null,
        quantity: 0,
        details: "",
        price: 0,
      };
    });
    setRows(aux);
  };

  if (rows.length === 0) return <div></div>;

  return (
    <BillContainer>
      <BillBar
        id={billData?.id}
        newId={newId}
        billDate={billDate}
        values={values}
        rows={rows}
        sign={sign}
        updateValues={updateValues}
        clearData={clearData}
        save={save}
      />
      <Paper className="mainPaper">
        <BillHeader
          id={billData?.id}
          deliveryDate={values.deliveryDate}
          billDate={billDate}
          hour={values.hour}
          newId={newId}
          handleChange={handleChange}
          updateValues={updateValues}
        />
        <BillUserInfo
          name={values.name}
          phone={values.phone}
          handleChange={handleChange}
        />
        <BillDetails
          rows={rows}
          handleChangeRow={handleChangeRow}
          handleChangeRowNumber={handleChangeRowNumber}
        />
        <BillFooter
          note={values.note}
          sign={sign}
          subTotal={rows
            .map((i) => i.quantity * i.price)
            .reduce((prev, current) => prev + current)}
          total={
            rows
              .map((i) => i.quantity * i.price)
              .reduce((prev, current) => prev + current) - sign
          }
          handleChange={handleChange}
          handleChangeSign={handleChangeSign}
        />
      </Paper>
    </BillContainer>
  );
};

export default Bill;
