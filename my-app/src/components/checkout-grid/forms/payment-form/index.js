import * as React from "react";

import Stack from "@mui/material/Stack";

import PaymentSchedulePicker from "./PaymentSchedulePicker";
import CreditCardInput from "./credit-card-input";
import RecurringInput from "./recurring-input";
import useFormStore from "stores/formStore";
import SinglePaymentInput from "./single-payment-input";

export default function PaymentForm() {
  const isRecurring = useFormStore((state) => state.isRecurring);

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <PaymentSchedulePicker isRecurring={isRecurring} />
      {isRecurring && <RecurringInput />}
      {!isRecurring && <SinglePaymentInput />}
      <CreditCardInput />
    </Stack>
  );
}
