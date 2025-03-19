import * as React from "react";
// @ts-ignore
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { CardGiftcard, Repeat } from "@mui/icons-material";
import PaymentSchedulePicker from "./PaymentSchedulePicker";
import CreditCardInput from "./CreditCardInput";

export default function PaymentForm() {
  const [paymentSchedule, setPaymentSchedule] = React.useState("oneTime");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");

  const handlePaymentScheduleChange = (event) => {
    setPaymentSchedule(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <PaymentSchedulePicker
        paymentSchedule={paymentSchedule}
        handlePaymentScheduleChange={handlePaymentScheduleChange}
        setPaymentSchedule={setPaymentSchedule}
      />
      {paymentSchedule === "recurring" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
            Create a Recurring Donation
          </Typography>
          <Typography variant="body1" gutterBottom>
            W.I.P. RECURRING FUNCTIONALITY IS STILL A WORK IN PROGRESS.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Default Options:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              Monthly, Quarterly, Yearly
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Payment Start Date:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              May 4th 2025 (info ?)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Frequency:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              Weekly
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              End of Recurring Cycle:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              June 2025
            </Typography>
          </Box>
        </Box>
      )}
      <CreditCardInput
        cardNumber={cardNumber}
        handleCardNumberChange={handleCardNumberChange}
        cvv={cvv}
        handleCvvChange={handleCvvChange}
        expirationDate={expirationDate}
        handleExpirationDateChange={handleExpirationDateChange}
      />
    </Stack>
  );
}
