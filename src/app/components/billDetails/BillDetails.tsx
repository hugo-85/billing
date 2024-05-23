import { ChangeEvent, FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BillDetailsBox } from "./billDetails.styles";
import BillRow from "../billRow/BillRow";

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
        <BillRow
          key={`row-${i}`}
          index={i}
          row={rows[i]}
          handleChangeRow={handleChangeRow}
          handleChangeRowNumber={handleChangeRowNumber}
        />
      );
    }
    return rowsNode;
  };

  return (
    <BillDetailsBox>
      <TableContainer>
        <Table aria-label="details-table">
          <TableHead>
            <TableRow>
              <TableCell aria-label="quantity" className="customText">
                Cantidad
              </TableCell>
              <TableCell aria-label="details" className="customText">
                Detalle
              </TableCell>
              <TableCell aria-label="price" className="customText">
                Unitario
              </TableCell>
              <TableCell aria-label="total" className="customText">
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{drawRows()}</TableBody>
        </Table>
      </TableContainer>
    </BillDetailsBox>
  );
};

export default BillDetails;
