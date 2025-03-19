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

function CreditCardInput({ payment, handleCardChange }) {
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
              autoComplete="ccNumber"
              placeholder="0000 0000 0000 0000"
              required
              size="small"
              value={payment.ccNumber}
              onChange={handleCardChange}
            />
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
            />
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
              onChange={handleCardChange}
            />
          </FormGrid>
        </Box>
      </PaymentContainer>
    </Box>
  );
}

export default CreditCardInput;
