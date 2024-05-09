import { ChangeEvent, FC } from "react";
import { Box } from "@mui/material";

interface BillFooterProps {
  note: string;
  sign?: number;
  subTotal: number;
  total: number;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeSign: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const BillFooter: FC<BillFooterProps> = ({
  note,
  sign,
  subTotal,
  total,
  handleChange,
  handleChangeSign,
}) => {
  return (
    <Box className="footer">
      <Box className="title customText">NOTAS</Box>
      <Box className="note">
        <textarea name="note" value={note} onChange={handleChange} rows={3} />
      </Box>
      <Box className="totals">
        <Box className="total-title">
          <span>Sub. Total:</span>
        </Box>
        <Box>
          <input name="subTotal" value={`$ ${subTotal}`} disabled />
        </Box>
        <Box className="total-title">
          <span>Seña:</span>
        </Box>
        <Box>
          <input name="sign" value={`$ ${sign}`} onChange={handleChangeSign} />
        </Box>
        <Box className="total-title">
          <span>Saldo Restante:</span>
        </Box>
        <Box>
          <input name="rest" value={`$ ${total}`} disabled />
        </Box>
      </Box>
    </Box>
  );
};

export default BillFooter;
