import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeSelect from "../shared-theme/ColorModeSelect";
import PHJLogo from "components/logos/PHJLogo";
import GradientBackground from "components/background/GradientBackground";
import { AccountBalance, CreditCard } from "@mui/icons-material";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const InitialPaymentSelectContainer = styled(Stack)(({ theme }) => ({
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

function InitialPaymentSelect({ setPaymentType, ...props }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <InitialPaymentSelectContainer
        direction="column"
        justifyContent="space-between"
      >
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <PHJLogo />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Philippine Jesuit Foundation
          </Typography>
          <Divider>Choose Payment Type</Divider>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Button
              fullWidth
              onClick={() => {
                setPaymentType("creditCard");
              }}
              variant="outlined"
              startIcon={<CreditCard />}
            >
              Credit Card
            </Button>
            <Button
              fullWidth
              onClick={() => {
                setPaymentType("bank");
              }}
              variant="outlined"
              startIcon={<AccountBalance />}
            >
              Bank
            </Button>
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
      </InitialPaymentSelectContainer>
    </AppTheme>
  );
}

export default function ({ setPaymentType }) {
  return (
    <GradientBackground
      ChildComponent={() => (
        <InitialPaymentSelect setPaymentType={setPaymentType} />
      )}
    />
  );
}
