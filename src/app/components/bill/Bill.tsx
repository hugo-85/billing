"use client";

import { FC, useState, ChangeEvent, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import { SxProps } from "@mui/system";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import dayjs, { Dayjs } from "dayjs";
import { clearCache } from "@/app/actions";
import BillFooter from "./BillFooter";
import BillUserInfo from "./BillUserInfo";
import BillDetails from "./BillDetails";
import BillHeader from "./BillHeader";
import { billFormType } from "@/app/types/bills";
import BillBar from "./BillBar";

const styles: SxProps = {
  "& input": {
    border: "none",
    background: "white",
    color: "black",
  },
  "& textarea": {
    background: "white",
    color: "black",
  },
  "& th": {
    color: "black",
  },
  ".MuiPaper-root": {
    color: "black",
    background: "white",
  },
  "& .actions": {
    display: "flex",
    justifyContent: "flex-end",
    mb: "20px",
    p: "10px",
    gap: "20px",
    "& > div": {
      flex: 0.3,
    },

    "& .MuiSelect-select": {
      color: "black",
    },

    "& .MuiButtonBase-root": {
      background: "#343434",
    },
  },
  "& .mainPaper": {
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "700px",
    maxWidth: "900px",
  },
  "& .header": {
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
        mb: "3px",

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
      height: "36px",
      background: "#f7f79c",
      borderLeft: "3px solid",
      borderRight: "3px solid",
      borderBottom: "3px solid",
      textAlign: "center",
    },
  },
  "& .info": {
    display: "flex",
    justifyContent: "space-between",
    p: "5px",
    borderBottom: "5px solid",
    "& > div": {
      display: "flex",
      alignItems: "baseline",
      gap: "5px",
      "& span": {
        fontWeight: 700,
        fontSize: "16px",
      },
    },
  },
  "& .details": {
    "& input": {
      border: "none",
      background: "white",
      color: "black",
      p: "0px",
      minWidth: "10px",
      width: "100%",
    },
    "& .MuiTableCell-root": {
      borderColor: "black",
      borderRight: "2px solid black",
    },

    "& .MuiTableRow-head": {
      borderBottom: "2px solid",

      "& .MuiTableCell-head": {
        p: "5px",
        background: "#e0e0e0",
      },
    },
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root": {
        borderBottom: "1px solid",
      },
    },
    "& .MuiTableCell-body": {
      padding: "0px",
      paddingLeft: "10px",
      paddingTop: "5px",
    },
  },
  "& .footer": {
    display: "flex",
    height: "70px",
    alignItems: "center",
    borderTop: "2px solid",
    "& > div": {
      borderRight: "2px solid",
      height: "100%",
      minWidth: "80px",
    },
    "& .title": {
      width: "84px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    },
    "& .note": {
      width: "536px",
      padding: "5px",
      "& textarea": {
        width: "100%",
        height: "100%",
        resize: "none",
        border: "none",
      },
    },
    "& .totals": {
      width: "250px",
      display: "flex",
      flexWrap: "wrap",
      flexShrink: 0,

      "& .total-title": {
        borderRight: "2px solid",
        textAlign: "left",
        fontSize: "14px",
        fontWeight: 900,
      },
      "& > div": {
        width: "50%",
        borderBottom: "2px solid",
        paddingRight: "5px",
        paddingLeft: "5px",
      },

      "& input": {
        textAlign: "right",
      },
    },
    "& input": {
      border: "none",
      p: "0px",
      minWidth: "10px",
      width: "100%",
    },
  },
  "& .customText": {
    fontWeight: 700,
    fontSize: "16px",
  },
};

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

    if (billData && billData.details.length > 0) {
      let aux = billData.details.map((d: any) => {
        return {
          id: d.id,
          quantity: d.quantity,
          details: d.detail,
          price: d.price,
        };
      });

      const aux2 = [...Array(10 - billData.details.length)].map(
        (d: any, i: number) => {
          return {
            id: null,
            quantity: 0,
            details: "",
            price: 0,
          };
        }
      );

      setRows(aux.concat(aux2));
    } else {
      const aux = [...Array(10)].map((element, index) => {
        return {
          id: null,
          quantity: 0,
          details: "",
          price: 0,
        };
      });
      setRows(aux);
    }
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
    <Container sx={styles}>
      <Paper className="mainPaper">
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
    </Container>
  );
};

export default Bill;
