import { ChangeEvent, FC } from "react";
import { Box } from "@mui/material";

interface BillUserInfoProps {
  name: string;
  phone: string;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const BillUserInfo: FC<BillUserInfoProps> = ({ name, phone, handleChange }) => {
  return (
    <Box className="info">
      <Box>
        <span>Nombre:</span>
        <input name="name" value={name} onChange={handleChange} />
      </Box>
      <Box>
        <span>Telefono:</span>
        <input name="phone" value={phone} onChange={handleChange} />
      </Box>
      <Box>
        <span>Direccion:</span>
        <input name="note" disabled />
      </Box>
    </Box>
  );
};

export default BillUserInfo;
