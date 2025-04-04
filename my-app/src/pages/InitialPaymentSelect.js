import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled, useColorScheme } from "@mui/material/styles";
import PHJLogo from "components/logos/PHJLogo";
import GradientBackground from "components/background/GradientBackground";
import { AccountBalance, CreditCard } from "@mui/icons-material";
import ColorModeSelect from "shared-theme/ColorModeSelect";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "600px",
  },
  backgroundColor: "rgba(5, 7, 10, 0.4)",
  borderBottomColor: "rgba(51, 60, 77, 0.6)",
  borderLeftColor: "rgba(51, 60, 77, 0.6)",
  borderRightColor: "rgba(51, 60, 77, 0.6)",
  borderTopColor: "rgba(51, 60, 77, 0.6)",
  boxShadow:
    "rgba(9, 11, 17, 0.5) 0px 5px 15px 0px, rgba(19, 23, 32, 0.08) 0px 15px 35px -5px",
  color: "rgb(255, 255, 255)",
  ...theme.applyStyles("dark", {
    boxShadow:
      "rgba(9, 11, 17, 0.5) 0px 5px 15px 0px, rgba(19, 23, 32, 0.08) 0px 15px 35px -5px",
  }),
}));

const Container = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  width: "100%",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

// const BlackButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "rgb(11, 14, 20)",
//   borderBottomColor: "rgb(51, 60, 77)",
//   borderLeftColor: "rgb(51, 60, 77)",
//   borderRightColor: "rgb(51, 60, 77)",
//   borderTopColor: "rgb(51, 60, 77)",
//   color: "rgb(255, 255, 255)",
//   "&:hover": {
//     backgroundColor: "rgb(30, 35, 45)", // Darker shade on hover
//     // You can also change border colors on hover if needed
//     borderBottomColor: "rgb(70, 80, 100)",
//     borderLeftColor: "rgb(70, 80, 100)",
//     borderRightColor: "rgb(70, 80, 100)",
//     borderTopColor: "rgb(70, 80, 100)",
//   },
// }));

const BlackButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(11, 14, 20)",
  borderBottomColor: "rgb(51, 60, 77)",
  borderLeftColor: "rgb(51, 60, 77)",
  borderRightColor: "rgb(51, 60, 77)",
  borderTopColor: "rgb(51, 60, 77)",
  color: "white", // Ensure text is visible over gradients
  position: "relative",
  overflow: "hidden", // Ensures gradients don't spill outside borders
  zIndex: 1, // Needed for pseudo-elements

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: `
      radial-gradient(at 9% 57%, hsla(45,72%,65%,1) 0px, transparent 100%),
      radial-gradient(at 56% 40%, hsla(21,91%,62%,1) 0px, transparent 100%),
      radial-gradient(at 18% 75%, hsla(15,77%,69%,1) 0px, transparent 100%),
      radial-gradient(at 31% 75%, hsla(5,97%,60%,1) 0px, transparent 100%),
      radial-gradient(at 75% 39%, hsla(356,66%,63%,1) 0px, transparent 100%)
    `,
    opacity: 0,
    zIndex: -1,
  },

  "&:hover": {
    color: "black", // Dark text for better contrast with bright gradients
    "&::before": {
      opacity: 1, // Reveal gradients on hover
    },
    border: "1px solid black !important",
  },
}));
function InitialPaymentSelectContainer({ setPaymentType }) {
  return (
    <Container direction="column" justifyContent="space-between">
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
      <Card variant="outlined">
        <PHJLogo sx={{ alignSelf: "center" }} />
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
          }}
        >
          Philippine Jesuit Foundation Donation Page
        </Typography>
        <Divider>Choose Payment Type</Divider>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <BlackButton
            fullWidth
            onClick={() => {
              setPaymentType("creditCard");
            }}
            variant="outlined"
            startIcon={<CreditCard />}
          >
            Credit Card
          </BlackButton>
          <BlackButton
            fullWidth
            onClick={() => {
              setPaymentType("bank");
            }}
            variant="outlined"
            startIcon={<AccountBalance />}
          >
            Debit / ACH
          </BlackButton>
          {/* <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Donate as a Guest
              </Link>
            </Typography> */}
        </Box>
      </Card>
    </Container>
  );
}

export default function InitialPaymentSelect({ setPaymentType }) {
  return (
    <GradientBackground
      ChildComponent={() => (
        <InitialPaymentSelectContainer setPaymentType={setPaymentType} />
      )}
    />
  );
}
