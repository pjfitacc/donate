import {
  Box,
  Grid2,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React from "react";
import MobileStepper from "../mobile/MobileStepper";
import DonorForm from "./forms/donor-form";
import PaymentForm from "./forms/payment-form";
import Review from "./forms/review-form";
import Buttons from "components/navigation/Buttons";

function CheckoutGrid({ activeStep, steps, onNext, onBack, isSubmitting }) {

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <DonorForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  };

  return (
    <Grid2
      id="checkout"
      size={{ sm: 12, md: 7, lg: 8 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        width: "100%",
        backgroundColor: { xs: "transparent", sm: "background.default" },
        alignItems: "start",
        pt: { xs: 0, sm: 4 },
        px: { xs: 2, sm: 10 },
        gap: { xs: 2, md: 4 },
      }}
    >
      <Box
        id="desktop-stepper"
        sx={{
          display: "flex",
          justifyContent: { sm: "space-between", md: "flex-end" },
          alignItems: "center",
          width: "100%",
          maxWidth: { sm: "100%", md: "90%" },
        }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexGrow: 1,
          }}
        >
          <Stepper
            id="desktop-stepper"
            activeStep={activeStep}
            sx={{ width: "100%", height: 40 }}
          >
            {steps.map((label) => (
              <Step
                sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
                key={label}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>
      <Box sx={checkoutInnerBoxStyle}>
        <MobileStepper activeStep={activeStep} steps={steps} />
        {getStepContent(activeStep)}
        <Buttons activeStep={activeStep} steps={steps} onNext={onNext} onBack={onBack} isSubmitting={isSubmitting} />
      </Box>
    </Grid2 >
  );
}

export default React.memo(CheckoutGrid);

const checkoutInnerBoxStyle = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
  maxWidth: { sm: "100%", md: "90%" },
  maxHeight: "720px",
  gap: { xs: 2, md: "none" },
};
