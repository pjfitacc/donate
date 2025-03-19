import { CardGiftcard } from "@mui/icons-material";
import { FormLabel, OutlinedInput, styled, Typography } from "@mui/material";

import Box from "@mui/material/Box";
import React from "react";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";

const PaymentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: "1px solid ",
  // @ts-ignore
  borderColor: (theme.vars || theme).palette.divider,
  background:
    "linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)",
  boxShadow: "0px 4px 8px hsla(210, 0%, 0%, 0.05)",
  [theme.breakpoints.up("xs")]: {
    height: 300,
  },
  [theme.breakpoints.up("sm")]: {
    height: 350,
  },
  ...theme.applyStyles("dark", {
    background:
      "linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)",
    boxShadow: "0px 4px 8px hsl(220, 35%, 0%)",
  }),
}));

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

function CreditCardInput({
  cardNumber,
  handleCardNumberChange,
  cvv,
  handleCvvChange,
  expirationDate,
  handleExpirationDateChange,
}) {
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
            <FormLabel htmlFor="card-number" required>
              Card number
            </FormLabel>
            <OutlinedInput
              id="card-number"
              autoComplete="card-number"
              placeholder="0000 0000 0000 0000"
              required
              size="small"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </FormGrid>
          <FormGrid sx={{ maxWidth: "20%" }}>
            <FormLabel htmlFor="cvv" required>
              CVV
            </FormLabel>
            <OutlinedInput
              id="cvv"
              autoComplete="CVV"
              placeholder="123"
              required
              size="small"
              value={cvv}
              onChange={handleCvvChange}
            />
          </FormGrid>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormGrid sx={{ flexGrow: 1 }}>
            <FormLabel htmlFor="card-name" required>
              Name
            </FormLabel>
            <OutlinedInput
              id="card-name"
              autoComplete="card-name"
              placeholder="Your Name"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid sx={{ flexGrow: 1 }}>
            <FormLabel htmlFor="card-expiration" required>
              Expiration date
            </FormLabel>
            <OutlinedInput
              id="card-expiration"
              autoComplete="card-expiration"
              placeholder="MM/YY"
              required
              size="small"
              value={expirationDate}
              onChange={handleExpirationDateChange}
            />
          </FormGrid>
        </Box>
      </PaymentContainer>
    </Box>
  );
}

export default CreditCardInput;
