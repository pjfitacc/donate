import { CardGiftcard, Repeat } from "@mui/icons-material";
import {
  CardActionArea,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import React from "react";

const Card = styled(MuiCard)(({ theme }) => ({
  border: "1px solid",
  // @ts-ignore
  borderColor: (theme.vars || theme).palette.divider,
  width: "100%",
  "&:hover": {
    background:
      "linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)",
    borderColor: "primary.light",
    boxShadow: "0px 2px 8px hsla(0, 0%, 0%, 0.1)",
    ...theme.applyStyles("dark", {
      background:
        "linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)",
      borderColor: "primary.dark",
      boxShadow: "0px 1px 8px hsla(210, 100%, 25%, 0.5) ",
    }),
  },
  [theme.breakpoints.up("md")]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      // @ts-ignore
      props: ({ selected }) => selected,
      style: {
        // @ts-ignore
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles("dark", {
          // @ts-ignore
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

function PaymentSchedulePicker({
  isRecurring,
  handlePaymentScheduleChange,
  setRecurring,
}) {
  return (
    <FormControl component="fieldset" fullWidth>
      <FormLabel htmlFor="">Donation Schedule</FormLabel>
      <RadioGroup
        aria-label="Payment options"
        name="paymentSchedule"
        value={isRecurring ? "recurring" : "oneTime"}
        onChange={handlePaymentScheduleChange}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Card
          // @ts-ignore
          selected={!isRecurring}
        >
          <CardActionArea
            onClick={() => setRecurring(false)}
            sx={{
              ".MuiCardActionArea-focusHighlight": {
                backgroundColor: "transparent",
              },
              "&:focus-visible": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CardGiftcard
                fontSize="small"
                sx={[
                  (theme) => ({
                    color: "grey.400",
                    ...theme.applyStyles("dark", {
                      color: "grey.600",
                    }),
                  }),
                  !isRecurring && {
                    color: "primary.main",
                  },
                ]}
              />
              <Typography sx={{ fontWeight: "medium" }}>
                One Time Donation
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          // @ts-ignore
          selected={isRecurring}
        >
          <CardActionArea
            onClick={() => setRecurring(true)}
            sx={{
              ".MuiCardActionArea-focusHighlight": {
                backgroundColor: "transparent",
              },
              "&:focus-visible": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Repeat
                fontSize="small"
                sx={[
                  (theme) => ({
                    color: "grey.400",
                    ...theme.applyStyles("dark", {
                      color: "grey.600",
                    }),
                  }),
                  isRecurring && {
                    color: "primary.main",
                  },
                ]}
              />
              <Typography sx={{ fontWeight: "medium" }}>
                Recurring Donation
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </RadioGroup>
    </FormControl>
  );
}

export default PaymentSchedulePicker;
