import * as React from "react";
import { validateForm, validateQuantumGatewayResponse } from "../utils/validation";
import DonationInfoGrid from "../components/donation-info-grid";
import CheckoutGrid from "../components/checkout-grid";
import useErrorStore from "stores/errorStore";
import { mapFormValuesToQGWdbeFields } from "constants/mapping";
import useFormStore from "stores/formStore";
import { TransQGWdbePOSTUrl } from "constants/quantumGateway";
import isDev from "utils/DevDetect";
import { fakeQGWResponse } from "data/fake";

const steps = ["Donation Info", "Payment details", "Review your order"];
const FINALSTEP = steps.length - 1;

export default function Checkout({ setSubmitResponse }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNext = React.useCallback(async () => {
    if (activeStep === FINALSTEP) {
      setIsSubmitting(true);
      const response = await submitForm();

      setSubmitResponse(response)

      return;
    }

    const formSubmitErrors = validateForm(activeStep);

    useErrorStore.getState().resetForm();
    if (Object.keys(formSubmitErrors).length > 0) {
      useErrorStore.setState(formSubmitErrors);
      return;
    }

    setActiveStep(activeStep + 1);
  }, [activeStep, setActiveStep, setSubmitResponse]);

  const handleBack = React.useCallback(() => {
    setActiveStep(activeStep - 1);
  }, [activeStep]);

  return (
    <>
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
    </>
  );
}

const submitForm = async () => {
  const form = useFormStore.getState();
  const QGWOptions = mapFormValuesToQGWdbeFields(form);

  // Convert JSON object to URL-encoded format
  const formData = new URLSearchParams();
  Object.entries(QGWOptions).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = isDev() ?
      fakeQGWResponse
      :
      await fetch(TransQGWdbePOSTUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(), // ✅ Correctly formatted body
      });

    if (!response.ok) {
      throw new Error(`Response status from Payment Server: ${response.status}`);
    }

    const jsonResponse = await response.json() // Convert response to JSON

    validateQuantumGatewayResponse(jsonResponse);

    return jsonResponse;
  } catch (error) {
    return error;
  }
};
