import { FC } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { billFormType } from "@/app/types/bills";

interface BillBarProps {
  id: number | null;
  newId: number | null;
  billDate: Dayjs;
  values: billFormType;
  sign: number;
  rows: any[];
  updateValues: (name: string, value: string | Dayjs) => void;
  save: () => void;
  clearData: () => void;
}

const BillBar: FC<BillBarProps> = ({
  id,
  newId,
  billDate,
  values,
  rows,
  sign,
  updateValues,
  clearData,
  save,
}) => {
  const handleChangeState = (e: SelectChangeEvent<string>) => {
    updateValues(e.target.name, e.target.value);
  };

  const download = () => {
    let data =
      "id,monto,fecha,fecha_entrega,hora,nombre,telefono,estado,sena,cantidad,detalle,precio";
    const formatDate = billDate.format("DD/MM/YYYY");
    let delDate: string | null = null;
    if (values.deliveryDate) delDate = values.deliveryDate.format("DD/MM/YYYY");

    rows.forEach((r) => {
      if (r.quantity > 0)
        data =
          data +
          "\n" +
          `${newId || id},${values.amount},${formatDate},${delDate},${
            values.hour
          },${values.name},${values.phone},${values.state},${sign},${
            r.quantity
          },${r.details},${r.price}`;
    });

    var billCsv = document.createElement("a");
    billCsv.href = "data:text/csv;charset=utf-8," + encodeURI(data);
    billCsv.target = "_blank";

    //provide the name for the CSV file to be downloaded
    billCsv.download = "factura.csv";
    billCsv.click();
  };

  return (
    <Paper className="actions no-print">
      <FormControl fullWidth>
        <InputLabel id="state">Estado</InputLabel>
        <Select
          labelId="state"
          id="state"
          value={values.state}
          label="Estado"
          name="state"
          onChange={handleChangeState}
        >
          <MenuItem value={"ARCHIVADO"}>Archivado</MenuItem>
          <MenuItem value={"ENTREGADO"}>Entregado</MenuItem>
          <MenuItem value={"VENCIDO"}>Vencido</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={save}>
        Guardar
      </Button>
      {!id && (
        <Button variant="contained" onClick={clearData}>
          Limpiar
        </Button>
      )}
      {(id || newId) && (
        <Button variant="contained" onClick={download}>
          Descargar
        </Button>
      )}
    </Paper>
  );
};

export default BillBar;
