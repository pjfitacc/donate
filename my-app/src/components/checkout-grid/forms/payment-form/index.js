import * as React from "react";

import Stack from "@mui/material/Stack";

import PaymentSchedulePicker from "./PaymentSchedulePicker";
import CreditCardInput from "./credit-card-input";
import RecurringInput from "./recurring-input";

export default function PaymentForm() {
  const [isRecurring, setRecurring] = React.useState("oneTime");

  const handlePaymentScheduleChange = (event) => {
    setRecurring(event.target.value);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <PaymentSchedulePicker
        paymentSchedule={isRecurring}
        handlePaymentScheduleChange={handlePaymentScheduleChange}
        setPaymentSchedule={setRecurring}
      />
      {isRecurring === "recurring" && <RecurringInput />}
      <CreditCardInput />
    </Stack>
  );
}
