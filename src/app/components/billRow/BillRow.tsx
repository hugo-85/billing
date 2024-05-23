import { ChangeEvent, FC } from "react";
import { TableCell, TableRow } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface BillRowProps {
  index: number;
  row: any;
  handleChangeRow: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleChangeRowNumber: (index: number, field: string, value: number) => void;
}

const BillRow: FC<BillRowProps> = ({
  index,
  row,
  handleChangeRow,
  handleChangeRowNumber,
}) => {
  return (
    <TableRow>
      <TableCell width={"82px"} component="th" scope="row">
        <NumericFormat
          id={index.toString()}
          name="quantity"
          aria-label="quantity"
          value={row.quantity}
          decimalScale={0}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.event?.target) {
              const id = (sourceInfo.event?.target as any).id;
              const name = (sourceInfo.event?.target as any).name;

              handleChangeRowNumber(id, name, values.floatValue || 0);
            }
          }}
        />
      </TableCell>
      <TableCell component="th" scope="row">
        <input
          id={index.toString()}
          name="details"
          aria-label="details"
          value={row.details}
          onChange={handleChangeRow}
        />
      </TableCell>
      <TableCell width={"125px"} component="th" scope="row">
        <NumericFormat
          id={index.toString()}
          name="price"
          aria-label="price"
          value={row.price}
          decimalScale={0}
          prefix={"$ "}
          onValueChange={(values, sourceInfo) => {
            if (sourceInfo.event?.target) {
              const id = (sourceInfo.event?.target as any).id;
              const name = (sourceInfo.event?.target as any).name;

              handleChangeRowNumber(id, name, values.floatValue || 0);
            }
          }}
        />
      </TableCell>
      <TableCell width={"125px"} component="th" scope="row">
        <input
          id={index.toString()}
          name="total"
          aria-label="total"
          value={`$ ${row.price * row.quantity}`}
          disabled
        />
      </TableCell>
    </TableRow>
  );
};

export default BillRow;
