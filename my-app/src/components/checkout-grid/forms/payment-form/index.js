import * as React from "react";

import Stack from "@mui/material/Stack";

import PaymentSchedulePicker from "./PaymentSchedulePicker";
import CreditCardInput from "./credit-card-input";
import RecurringInput from "./RecurringInput";

export default function PaymentForm(errors) {
  const [paymentSchedule, setPaymentSchedule] = React.useState("oneTime");

  const handlePaymentScheduleChange = (event) => {
    setPaymentSchedule(event.target.value);
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <PaymentSchedulePicker
        paymentSchedule={paymentSchedule}
        handlePaymentScheduleChange={handlePaymentScheduleChange}
        setPaymentSchedule={setPaymentSchedule}
      />
      {paymentSchedule === "recurring" && <RecurringInput />}
      <CreditCardInput errors={errors} />
    </Stack>
  );
}
