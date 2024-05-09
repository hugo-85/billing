import { ChangeEvent, FC, useEffect, useState } from "react";
import Image from "next/image";
import CustomDatePicker from "@/app/customs/CustomDatePicker";
import { Box } from "@mui/material";
import { Dayjs } from "dayjs";

interface BillHeaderProps {
  id?: number;
  deliveryDate: Dayjs | null;
  billDate: Dayjs;
  hour: string;
  newId: number | null;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  updateValues: (name: string, value: string | Dayjs) => void;
}

const BillHeader: FC<BillHeaderProps> = ({
  id,
  billDate,
  deliveryDate,
  hour,
  newId,
  handleChange,
  updateValues,
}) => {
  const [dayOfTheWeek, setDayOfTheWeek] = useState("");
  const [deliveryDays, setDeliveryDays] = useState<number>(0);

  var weekdays = new Array(7);
  weekdays[0] = "Domingo";
  weekdays[1] = "Lunes";
  weekdays[2] = "Martes";
  weekdays[3] = "Miercoles";
  weekdays[4] = "Jueves";
  weekdays[5] = "Viernes";
  weekdays[6] = "Sabado";

  useEffect(() => {
    if (deliveryDate) {
      setDayOfTheWeek(weekdays[deliveryDate.get("day")]);
      const restDays = deliveryDate.diff(billDate, "day");

      setDeliveryDays(restDays);
    }
  }, []);

  const handleDateChanges =
    (id: string | number) =>
    (newValue: Dayjs | null | undefined): void => {
      try {
        if (newValue) {
          setDayOfTheWeek(weekdays[newValue.get("day")]);

          const restDays = newValue.isSame(billDate, "day")
            ? 0
            : newValue.diff(billDate, "day") + 1;

          setDeliveryDays(restDays);
          //   setValues({ ...values, deliveryDate: newValue });
          //   setUpdated({ ...updated, delivery_date: newValue });
          updateValues("deliveryDate", newValue);
        }
      } catch (e) {
        null;
      }
    };

  return (
    <Box className="header">
      <Box className="headerLogo">
        <Box className="logo">
          <Image
            width={300}
            height={160}
            alt="banbino-logo"
            src="/imgs/logo.png"
          />
        </Box>
        <Box className="infoLabel customText">DATOS DEL CLIENTE</Box>
      </Box>
      <Box className="headerData">
        <Box className="staticData">
          <span className="customText">Fecha Hoy:</span>
          <span>
            {billDate.get("date") +
              "/" +
              (billDate.get("month") + 1) +
              "/" +
              billDate.get("year")}
          </span>
        </Box>
        <Box className="staticData2">
          <span className="customText">Numero:</span>
          <span className="idBill customText">{id || newId}</span>
        </Box>
        <Box className="mid">
          <Box className="customText">Fecha Entrega:</Box>
          <Box>
            <CustomDatePicker
              id="deliveryDate"
              value={deliveryDate}
              handleDateChanges={handleDateChanges}
            />
          </Box>
        </Box>
        <Box className="mid2">
          <Box className="customText">Hora:</Box>
          <Box>
            <input name="hour" value={hour} onChange={handleChange} />
          </Box>
        </Box>
        <Box className="full">
          <span className="customText">{`La entrega sera el dia: ${dayOfTheWeek}`}</span>
        </Box>
        <Box className="full">
          <span className="customText">{`RESTAN: ${deliveryDays} PARA RETIRAR SU PEDIDO`}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default BillHeader;
