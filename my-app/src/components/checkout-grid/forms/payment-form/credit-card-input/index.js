import { CardGiftcard } from "@mui/icons-material";
import {
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import { FormGrid, PaymentContainer } from "./styles";

function CreditCardInput({ errors }) {
  // Handlers to update form fields
  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "ccNumber") {
      handleCardNumberChange(e, name);
    } else if (name === "cvv") {
      handleCvvChange(e, name);
    } else if (name === "ccExpDate") {
      handleExpirationDateChange(e, name);
    } else {
      setPayment((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCardNumberChange = (event, name) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setPayment((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    }
  };

  const handleCvvChange = (event, name) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setPayment((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleExpirationDateChange = (event, name) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setPayment((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <PaymentContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle2">Credit card</Typography>
          <CardGiftcard sx={{ color: "text.secondary" }} />
        </Box>
        <SimCardRoundedIcon
          sx={{
            fontSize: { xs: 48, sm: 56 },
            transform: "rotate(90deg)",
            color: "text.secondary",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: 2,
          }}
        >
          <FormGrid sx={{ flexGrow: 1 }}>
            <FormLabel htmlFor="ccNumber" required>
              Card number
            </FormLabel>
            <OutlinedInput
              id="ccNumber"
              name="ccNumber"
              autoComplete="cc Number"
              placeholder="0000 0000 0000 0000"
              required
              size="small"
              value={payment.ccNumber}
              onChange={handleCardChange}
              style={{ borderColor: errors.ccNumber ? "red" : "" }}
            />
            {!!errors.ccNumber && (
              <FormHelperText error id="ccNumberError">
                {errors.ccNumber}
              </FormHelperText>
            )}
          </FormGrid>
          <FormGrid sx={{ maxWidth: "20%" }}>
            <FormLabel htmlFor="cvv" required>
              CVV
            </FormLabel>
            <OutlinedInput
              id="cvv"
              name="cvv"
              autoComplete="cvv"
              placeholder="123"
              required
              size="small"
              value={payment.cvv}
              onChange={handleCardChange}
              style={{ borderColor: errors.ccNumber ? "red" : "" }}
            />
            {!!errors.cvv && (
              <FormHelperText error id="cvvError">
                {errors.cvv}
              </FormHelperText>
            )}
          </FormGrid>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormGrid sx={{ flexGrow: 1 }}>
            <FormLabel htmlFor="ccName" required>
              Name
            </FormLabel>
            <OutlinedInput
              id="ccName"
              name="ccName"
              autoComplete="ccName"
              placeholder="Your Name"
              required
              size="small"
              value={payment.ccName}
              onChange={handleCardChange}
            />
          </FormGrid>
          <FormGrid sx={{ flexGrow: 1 }}>
            <FormLabel htmlFor="ccExpDate" required>
              Expiration date
            </FormLabel>
            <OutlinedInput
              id="ccExpDate"
              name="ccExpDate"
              autoComplete="ccExpDate"
              placeholder="MM/YY"
              required
              size="small"
              value={payment.ccExpDate}
              style={{ borderColor: errors.ccNumber ? "red" : "" }}
              onChange={handleCardChange}
            />
            {!!errors.ccExpDate && (
              <FormHelperText error id="ccExpDateError">
                {errors.ccExpDate}
              </FormHelperText>
            )}
          </FormGrid>
        </Box>
      </PaymentContainer>
    </Box>
  );
}

export default CreditCardInput;
