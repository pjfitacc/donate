import * as React from "react";
import { validateForm } from "../utils/validation";
import DonationInfoGrid from "../components/donation-info-grid";
import CheckoutGrid from "../components/checkout-grid";
import useErrorStore from "stores/errorStore";
import {
  createQuantumGatewayTransaction,
  mapFormValuesToQGWdbeFields,
} from "utils/quantumGateway";
import useFormStore from "stores/formStore";
import { Grid2 } from "@mui/material";

const steps = ["Donation Info", "Payment details", "Review your order"];
const FINALSTEP = steps.length - 1;

export default function Checkout({ setSubmitResponse }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNext = React.useCallback(async () => {
    const formSubmitErrors = validateForm(activeStep);

    useErrorStore.getState().resetForm();
    if (Object.keys(formSubmitErrors).length > 0) {
      useErrorStore.setState(formSubmitErrors);
      return;
    }

    if (activeStep === FINALSTEP) {
      setIsSubmitting(true);
      const response = await submitForm();

      setSubmitResponse(response);

      return;
    }

    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep, setSubmitResponse]);

  const handleBack = React.useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  return (
    <Grid2
      container
      sx={{
        height: {
          xs: "100%",
          sm: "calc(100dvh - var(--template-frame-height, 0px))",
        },
        pt: {
          xs: 2,
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
        isSubmitting={isSubmitting}
      ></CheckoutGrid>
    </Grid2>
  );
}

const submitForm = async () => {
  // Clear out Recurring Fields in the Form if the form's isRecurring method is false.
  filterForm();

  const form = useFormStore.getState();
  const QGWOptions = mapFormValuesToQGWdbeFields(form);

  return createQuantumGatewayTransaction(QGWOptions);
};

const filterForm = () => {
  const preFilteredForm = useFormStore.getState();
  // Clear out Recurring Fields in the Form if the form's isRecurring method is false.
  if (!preFilteredForm.isRecurring) {
    preFilteredForm.clearRecurringFields();
  }
};
