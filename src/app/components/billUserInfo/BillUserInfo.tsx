import { ChangeEvent, FC } from "react";
import { Box } from "@mui/material";
import { BillUserInfoBox } from "./billUserInfo.styles";

interface BillUserInfoProps {
  name: string;
  phone: string;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

const BillUserInfo: FC<BillUserInfoProps> = ({ name, phone, handleChange }) => {
  return (
    <BillUserInfoBox>
      <Box>
        <label htmlFor="name-input">Nombre:</label>
        <input
          id="name-input"
          aria-label="name"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="phone-input">Telefono:</label>
        <input
          id="phone-input"
          aria-label="phone"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <label htmlFor="address-input">Direccion:</label>
        <input
          id="address-input"
          aria-label="address"
          name="address"
          disabled
        />
      </Box>
    </BillUserInfoBox>
  );
};

export default BillUserInfo;
