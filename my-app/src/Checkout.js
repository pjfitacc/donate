import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import AppTheme from "./shared-theme/AppTheme";
import { validateDonation } from "./utils/validation";
import DonationInfoGrid from "./components/donation-info-grid";
import CheckoutGrid from "./components/checkout-grid";

const steps = ["Donation Info", "Payment details", "Review your order"];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [donationErrors, setDonationErrors] = React.useState({});
  const [submittedDonor, setSubmittedDonor] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    acceptTerms: false,
  });

  const [submittedDonation, setSubmittedDonation] = React.useState({
    amount: 10,
    beneficiary: "",
    comments: "",
  });

  const donationFormRef = React.useRef(null);

  const handleNext = (donor) => {
    const donation = donationFormRef.current.getDonation();
    const donationErrors = validateDonation(donor, donation);

    if (activeStep === 0) {
      if (Object.keys(donationErrors).length > 0) {
        // Check if the ONLY error is acceptTerms

        setDonationErrors(donationErrors);
        return;
      }
      setSubmittedDonation(donation);
      setSubmittedDonor(donor);
      setDonationErrors({});
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
          submittedDonation={submittedDonation}
          donationErrors={donationErrors}
          donationFormRef={donationFormRef}
        ></DonationInfoGrid>

        {/* <Grid
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
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
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
        </Grid> */}
        <CheckoutGrid
          submittedDonor={submittedDonor}
          activeStep={activeStep}
          steps={steps}
          onNext={handleNext}
          onBack={handleBack}
          errors={donationErrors}
        ></CheckoutGrid>
      </Grid>
    </AppTheme>
  );
}
