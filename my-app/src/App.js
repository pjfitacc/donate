import React from "react";
import "./App.css";
import "./pages/CreditCardCheckout";
import Submitted from "pages/Submitted";
import AppTheme from "shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import Checkout from "./pages/CreditCardCheckout";
import InitialPaymentSelect from "pages/InitialPaymentSelect";
import Bank from "pages/Bank";

function App({ ...props }) {
  // Payment Type State
  const [paymentType, setPaymentType] = React.useState("");

  const [submitResponse, setSubmitResponse] = React.useState(null);

  const creditCardPage = () => {
    switch (submitResponse) {
      case null:
        return <Checkout setSubmitResponse={setSubmitResponse} />;
      default:
        return <Submitted response={submitResponse} />;
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      {paymentType === "" && (
        <InitialPaymentSelect setPaymentType={setPaymentType} />
      )}

      {paymentType === "creditCard" && creditCardPage()}

      {paymentType === "bank" && <Bank />}
    </AppTheme>
  );
}

export default App;
