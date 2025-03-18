import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DonorForm from "./components/DonorForm";
import DonationInfo from "./components/DonationInfo";
import PaymentForm from "./components/PaymentForm";
import Review from "./components/Review";
import PHJLogo from "./components/PHJLogo";
import AppTheme from "./shared-theme/AppTheme";
import { validateDonation } from "./utils/validation";
import MobileStepper from "./components/mobile/MobileStepper";
import DonationInfoCard from "./components/mobile/DonationInfoCard";
import { DonationInfoToggleCard } from "./components/mobile/DonationInfoToggleCard";

const steps = ["Donation Info", "Payment details", "Review your order"];

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [donationErrors, setDonationErrors] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
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

  const donorFormRef = React.useRef(null);
  const donationFormRef = React.useRef(null);

  const handleNext = () => {
    const donor = donorFormRef.current.getDonor();
    const donation = donationFormRef.current.getDonation();
    const donationErrors = validateDonation(donor, donation);

    if (activeStep === 0) {
      if (Object.keys(donationErrors).length > 0) {
        // Check if the ONLY error is acceptTerms
        if (
          Object.keys(donationErrors).length === 1 &&
          donationErrors.acceptTerms
        ) {
          setOpenSnackbar(true); // Show the Snackbar alert
        }

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

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <DonorForm
            submittedDonor={submittedDonor}
            errors={donationErrors}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
            ref={donorFormRef}
          />
        );
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
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
        <Grid
          id="donation-info"
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "flex", md: "flex" }, // Ensure it shows on xs
            flexDirection: "column",
            backgroundColor: { xs: "transparent", md: "background.paper" }, // Different bg colors
            borderRight: { xs: "none", md: "1px solid" }, // Add border only on md+
            borderColor: { xs: "none", md: "divider" },
            alignItems: "start",
            pt: { xs: 2, md: 4 }, // Adjust padding
            px: { xs: 2, md: 10 }, // Different padding for xs and md+
            gap: { xs: 2, md: 4 }, // Adjust gap
          }}
        >
          {/* TODO: Work on Centering the Mobile View for the grid, logo, and donation card*/}
          <PHJLogo />
          {/* <Box sx={{ mt: {xs: -2}, mb: {xs: 2}, display: { xs: 'flex', md: 'flex', justifyContent: 'center', alignContent: 'center' } }}>
              <PHJLogo />
            </Box> */}
          
          <DonationInfoCard submittedDonation={submittedDonation} donationErrors={donationErrors} ref={donationFormRef} />
        </Grid>

        <Grid
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
        </Grid>
      </Grid>
    </AppTheme>
  );
}

const checkoutInnerBoxStyle = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
  maxWidth: { sm: "100%", md: "90%" },
  maxHeight: "720px",
  gap: { xs: 2, md: "none" },
};
