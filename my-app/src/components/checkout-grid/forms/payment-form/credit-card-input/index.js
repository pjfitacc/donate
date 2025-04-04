import { CardGiftcard } from "@mui/icons-material";
import {
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import { FormGrid, PaymentContainer } from "./styles";
import useFormStore from "stores/formStore";
import React, { useState } from "react";
import useErrorStore from "stores/errorStore";

function CreditCardInput() {
  // Handlers to update form fields
  const ccNumber = useFormStore((state) => state.ccNumber);
  const cvv = useFormStore((state) => state.cvv);
  const ccExpDate = useFormStore((state) => state.ccExpDate);
  const ccName = useFormStore((state) => state.ccName);
  const setField = useFormStore((state) => state.setField);

  const errors = useErrorStore((state) => state);

  const [cardType, setCardType] = useState("");

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "ccNumber") {
      handleCardNumberChange(e, name);
    } else if (name === "cvv") {
      handleCvvChange(e, name);
    } else if (name === "ccExpDate") {
      handleExpirationDateChange(e, name);
    } else {
      setField(name, value);
    }
  };

  const handleCardNumberChange = (event, name) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    // detect if the card is an Amex Card or not. 
    // Amex cards have 15 digits and start with 34 or 37
    const inputIsAmex = value.startsWith("34") || value.startsWith("37");

    // if our cardType is not Amex, and the inputted card number isAmex, set the cardType to Amex
    if (inputIsAmex) {
      setCardType("Amex");
    } else if (!inputIsAmex) {
      setCardType("");
      // if the cvv is 4 digits, set it to 3 digits
      setField("cvv", cvv.substring(0, 3));
    }

    if (inputIsAmex && value.length <= 15) {
      setField(name, formattedValue);
    } else if (!inputIsAmex && value.length <= 16) {
      setField(name, formattedValue);
    }
    
  };

  const handleCvvChange = (event, name) => {
    const value = event.target.value.replace(/\D/g, "");
    const isAmex = cardType === "Amex";

    if (isAmex && value.length <= 4) {
      setField(name, value);
    } else if (!isAmex && value.length <= 3) {
      setField(name, value);
    }
  };
  const handleExpirationDateChange = (event, name) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setField(name, formattedValue);
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
              placeholder={"0000 0000 0000 000" + (cardType === "Amex" ? "" : "0")}
              required
              size="small"
              value={ccNumber}
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
              placeholder={cardType === "Amex" ? "1234" : "123"}
              required
              size="small"
              value={cvv}
              onChange={handleCardChange}
              style={{ borderColor: errors.cvv ? "red" : "" }}
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
              value={ccName}
              style={{ borderColor: errors.ccName ? "red" : "" }}
              onChange={handleCardChange}
            />
            {!!errors.ccName && (
              <FormHelperText error id="ccNameError">
                {errors.ccName}
              </FormHelperText>
            )}
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
              value={ccExpDate}
              style={{ borderColor: errors.ccExpDate ? "red" : "" }}
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
