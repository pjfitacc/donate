import {
  Box,
  Button,
  Grid2,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MobileStepper from "../mobile/MobileStepper";
import DonorForm from "./forms/donor-form";
import PaymentForm from "./forms/payment-form";
import Review from "./forms/review-form";

function CheckoutGrid({ activeStep, steps, onNext, onBack }) {
  const handleNext = () => {
    onNext();
  };

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
        {activeStep === steps.length ? (
          <Stack id="complete-donation" spacing={2} useFlexGap>
            <Typography variant="h1">📦</Typography>
            <Typography variant="h5">Thank you for your order!</Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Your order number is
              <strong>&nbsp;#140396</strong>. We have emailed your order
              confirmation and will update you once its shipped.
            </Typography>
            <Button
              variant="contained"
              sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
            >
              Go to my orders
            </Button>
          </Stack>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box
              id="navigation-buttons"
              sx={[
                {
                  display: "flex",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  alignItems: "end",
                  flexGrow: 1,
                  gap: 1,
                  pb: { xs: 12, sm: 0 },
                  mt: { xs: 2, sm: 0 },
                  mb: "60px",
                },
                activeStep !== 0
                  ? { justifyContent: "space-between" }
                  : { justifyContent: "flex-end" },
              ]}
            >
              {activeStep !== 0 && (
                <Button
                  startIcon={<ChevronLeftRoundedIcon />}
                  onClick={onBack}
                  variant="text"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  Previous
                </Button>
              )}
              {activeStep !== 0 && (
                <Button
                  startIcon={<ChevronLeftRoundedIcon />}
                  onClick={onBack}
                  variant="outlined"
                  fullWidth
                  sx={{ display: { xs: "flex", sm: "none" } }}
                >
                  Previous
                </Button>
              )}
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleNext}
                sx={{ width: { xs: "100%", sm: "fit-content" } }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Grid2>
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
