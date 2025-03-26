import * as React from "react";

import Stack from "@mui/material/Stack";

import PaymentSchedulePicker from "./PaymentSchedulePicker";
import CreditCardInput from "./credit-card-input";
import RecurringInput from "./recurring-input";

export default function PaymentForm() {
  const [isRecurring, setRecurring] = React.useState(false);

  const handlePaymentScheduleChange = (event) => {
    setRecurring(event.target.value);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <PaymentSchedulePicker
        isRecurring={isRecurring}
        handlePaymentScheduleChange={handlePaymentScheduleChange}
        setRecurring={setRecurring}
      />
      {isRecurring && <RecurringInput />}
      <CreditCardInput />
    </Stack>
  );
}
