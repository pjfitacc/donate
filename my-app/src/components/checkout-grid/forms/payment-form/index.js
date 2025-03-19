import * as React from "react";

import Stack from "@mui/material/Stack";

import PaymentSchedulePicker from "./PaymentSchedulePicker";
import CreditCardInput from "./CreditCardInput";
import RecurringInput from "./RecurringInput";

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
      {paymentSchedule === "recurring" && <RecurringInput />}
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
