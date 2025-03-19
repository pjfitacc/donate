import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import AppTheme from "./shared-theme/AppTheme";
import { validateForm } from "./utils/validation";
import DonationInfoGrid from "./components/donation-info-grid";
import CheckoutGrid from "./components/checkout-grid";
import {
  donationModel,
  donorModel,
  initialForm,
  paymentModel,
} from "./components/models";

const steps = ["Donation Info", "Payment details", "Review your order"];

export const DonationContext = React.createContext([]);

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const [form, setForm] = React.useState({});
  const [formErrors, setFormErrors] = React.useState({});
  const [donation, setDonation] = React.useState(donationModel);

  console.log("form", form);

  const handleNext = React.useCallback(
    (formData) => {
      const formDataToCheck = { ...form, ...formData, ...donation };

      const formSubmitErrors = validateForm(formDataToCheck, activeStep);
      if (Object.keys(formSubmitErrors).length > 0) {
        setFormErrors(formSubmitErrors);
        return;
      }

      setFormErrors({});
      setForm(formDataToCheck);
      setActiveStep(activeStep + 1);
    },
    [activeStep]
  );

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
        <DonationContext.Provider value={[donation, setDonation]}>
          <DonationInfoGrid
            donationErrors={formErrors}
            editable={activeStep === 0 ? true : false}
          ></DonationInfoGrid>
        </DonationContext.Provider>

        <CheckoutGrid
          activeStep={activeStep}
          steps={steps}
          onNext={handleNext}
          onBack={handleBack}
          errors={formErrors}
        ></CheckoutGrid>
      </Grid>
    </AppTheme>
  );
}
