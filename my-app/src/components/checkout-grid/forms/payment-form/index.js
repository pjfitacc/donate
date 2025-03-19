import * as React from "react";

import Stack from "@mui/material/Stack";

import PaymentSchedulePicker from "./PaymentSchedulePicker";
import CreditCardInput from "./CreditCardInput";
import RecurringInput from "./RecurringInput";
import { PaymentContext } from "../..";

export default function PaymentForm(errors) {
  const [paymentSchedule, setPaymentSchedule] = React.useState("oneTime");
  const [payment, setPayment] = React.useContext(PaymentContext);

  const handlePaymentScheduleChange = (event) => {
    setPaymentSchedule(event.target.value);
  };

  // Handlers to update form fields
  const handleChange = (e) => {
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
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <PaymentSchedulePicker
        paymentSchedule={paymentSchedule}
        handlePaymentScheduleChange={handlePaymentScheduleChange}
        setPaymentSchedule={setPaymentSchedule}
      />
      {paymentSchedule === "recurring" && <RecurringInput />}
      <CreditCardInput payment={payment} handleCardChange={handleChange} />
    </Stack>
  );
}
