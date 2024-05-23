import { ChangeEvent, FC } from "react";
import { Box } from "@mui/material";
import { BillFooterBox } from "./billFooter.styles";

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
    <BillFooterBox>
      <Box className="title customText">NOTAS</Box>
      <Box className="note">
        <textarea
          aria-label="note"
          name="note"
          value={note}
          onChange={handleChange}
          rows={3}
        />
      </Box>
      <Box className="totals">
        <Box className="total-title">
          <span>Sub. Total:</span>
        </Box>
        <Box>
          <input
            aria-label="sub-total"
            name="subTotal"
            value={`$ ${subTotal}`}
            disabled
          />
        </Box>
        <Box className="total-title">
          <span>Seña:</span>
        </Box>
        <Box>
          <input
            aria-label="sign"
            name="sign"
            value={`$ ${sign}`}
            onChange={handleChangeSign}
          />
        </Box>
        <Box className="total-title">
          <span>Saldo Restante:</span>
        </Box>
        <Box>
          <input aria-label="rest" name="rest" value={`$ ${total}`} disabled />
        </Box>
      </Box>
    </BillFooterBox>
  );
};

export default BillFooter;
