import { ChangeEvent, FC } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NumericFormat } from "react-number-format";

interface BillDetailsProps {
  rows: any[];
  handleChangeRow: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleChangeRowNumber: (index: number, field: string, value: number) => void;
}

const BillDetails: FC<BillDetailsProps> = ({
  rows,
  handleChangeRow,
  handleChangeRowNumber,
}) => {
  const drawRows = () => {
    let rowsNode = [];
    for (let i = 0; i < 10; i++) {
      rowsNode.push(
        <TableRow key={i}>
          <TableCell width={"82px"} component="th" scope="row">
            <NumericFormat
              id={i.toString()}
              name="quantity"
              value={rows[i].quantity}
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
              id={i.toString()}
              name="details"
              value={rows[i].details}
              onChange={handleChangeRow}
            />
          </TableCell>
          <TableCell width={"125px"} component="th" scope="row">
            <NumericFormat
              id={i.toString()}
              name="price"
              value={rows[i].price}
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
              id={i.toString()}
              name="total"
              value={`$ ${rows[i].price * rows[i].quantity}`}
              disabled
            />
          </TableCell>
        </TableRow>
      );
    }
    return rowsNode;
  };

  return (
    <Box className="details">
      <TableContainer>
        <Table aria-label="details-table">
          <TableHead>
            <TableRow>
              <TableCell className="customText">Cantidad</TableCell>
              <TableCell className="customText">Detalle</TableCell>
              <TableCell className="customText">Unitario</TableCell>
              <TableCell className="customText">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{drawRows()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BillDetails;
