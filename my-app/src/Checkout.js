import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import AppTheme from "./shared-theme/AppTheme";
import { validateForm } from "./utils/validation";
import DonationInfoGrid from "./components/donation-info-grid";
import CheckoutGrid from "./components/checkout-grid";
import useErrorStore from "errorStore";
import HiddenSubmitForm from "HiddenSubmitForm";

const steps = ["Donation Info", "Payment details", "Review your order"];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const formRef = React.useRef(null);

  React.useEffect(() => {
    if (activeStep === steps.length - 1) formRef.current.focus();
  }, [activeStep, formRef]);

  const handleNext = React.useCallback(() => {
    if (activeStep === steps.length - 1) {
      formRef.current?.submit(); // Submit hidden form on final step
      return;
    }

    const formSubmitErrors = validateForm(activeStep);

    useErrorStore.getState().resetForm();
    if (Object.keys(formSubmitErrors).length > 0) {
      useErrorStore.setState(formSubmitErrors);
      return;
    }

    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep]);

  const handleBack = React.useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <DonationInfoGrid
          editable={activeStep === 0 ? true : false}
          activeStep={activeStep}
        ></DonationInfoGrid>

        <CheckoutGrid
          activeStep={activeStep}
          steps={steps}
          onNext={handleNext}
          onBack={handleBack}
        ></CheckoutGrid>
      </Grid>
      {activeStep === steps.length - 1 && <HiddenSubmitForm ref={formRef} />}
    </AppTheme>
  );
}
