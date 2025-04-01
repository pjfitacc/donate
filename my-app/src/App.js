import React from "react";
import "./App.css";
import "./pages/Checkout";
import Submitted from "pages/Submitted";
import AppTheme from "shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import Checkout from "./pages/Checkout";
import InitialPaymentSelect from "pages/InitialPaymentSelect";

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

      {paymentType === "bank" && creditCardPage()}
    </AppTheme>
  );
}

export default App;
