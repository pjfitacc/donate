import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useFormStore from "formStore";
import { Grid2 } from "@mui/material";

export default function Review() {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    country,
    amount,
    beneficiary,
    comments,
    ccNumber,
    ccName,
    ccExpDate,
  } = useFormStore((state) => state);
  const addresses = [address, city, state, zip, country];

  const payments = [
    { name: "Card type:", detail: getCardBrand(ccNumber) },
    { name: "Card holder:", detail: ccName },
    { name: "Card number:", detail: formatAndMaskCreditCard(ccNumber) },
    { name: "Expiry date:", detail: ccExpDate },
  ];

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Donation to" />
          <Typography variant="body2">{beneficiary}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Comments" />
          <Typography variant="body2">
            <em>{comments ? comments : "None"}</em>
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {amount} USD
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Your details
          </Typography>
          <Typography gutterBottom>
            {firstName} {lastName}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {addresses.join(", ")}
          </Typography>
          <Typography gutterBottom sx={{ color: "text.secondary" }}>
            {email}
          </Typography>
          {phone && (
            <Typography gutterBottom sx={{ color: "text.secondary" }}>
              {phone}
            </Typography>
          )}
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid2 container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid2>
        </div>
      </Stack>
    </Stack>
  );
}

function formatAndMaskCreditCard(creditCardString) {
  // Remove all non-digit characters
  const digitsOnly = creditCardString.replace(/\D/g, "");

  // Get the last 4 digits
  const lastFourDigits = digitsOnly.slice(-4);

  // Mask the rest of the digits
  const maskedDigits = "xxxx-xxxx-xxxx";

  // Combine the masked digits and the last 4 digits
  const formattedCard = `${maskedDigits}-${lastFourDigits}`;

  return formattedCard;
}

function getCardBrand(creditCardString) {
  // Remove all non-digit characters
  const digitsOnly = creditCardString.replace(/\D/g, "");

  // Define regex patterns for card brands
  const cardPatterns = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    Mastercard: /^5[1-5][0-9]{14}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    Amex: /^3[47][0-9]{13}$/,
  };

  // Check which card brand matches the digits
  for (const [brand, regex] of Object.entries(cardPatterns)) {
    if (regex.test(digitsOnly)) {
      return brand;
    }
  }

  // If no brand matches, return "Unknown"
  return "Unknown";
}
