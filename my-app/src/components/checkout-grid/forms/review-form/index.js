import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useFormStore from "stores/formStore";
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid2, Radio, RadioGroup, Tooltip } from "@mui/material";
import { RecurringRecipeIDs } from "constants/quantumGateway";
import { InfoOutlined } from '@mui/icons-material';
import useErrorStore from "stores/errorStore";

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
    customBeneficiary,
    comments,
    ccNumber,
    ccName,
    ccExpDate,
    recipeID,
    timesToRecur,
    initialIntervalAmount,
    recurAmount,
    isRecurring,
  } = useFormStore((state) => state);
  const addresses = [address, city, state, zip, country];

  const payments = [
    { name: "Card type:", detail: getCardBrand(ccNumber) },
    { name: "Card holder:", detail: ccName },
    { name: "Card number:", detail: formatAndMaskCreditCard(ccNumber) },
    { name: "Expiry date:", detail: ccExpDate },
  ];

  const recurringInfo = [
    {
      label: "Initial Donation Amount on Submit",
      value: `${initialIntervalAmount} USD`,
    },
    { label: "Recurring Amount", value: `${recurAmount} USD` },
    { label: "Recurring Frequency", value: RecurringRecipeIDs[recipeID]?.type },
    {
      label: "Times to recur:",
      value: `${timesToRecur === 0 ? "Indefinite" : timesToRecur}`,
    },
  ];

  const reviewAmount = () => {
    if (isRecurring) {
      return recurringInfo.map((info) => (
        <ListItem sx={{ py: 1, px: 0 }} key={info.label}>
          <ListItemText primary={info.label} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {info.value}
          </Typography>
        </ListItem>
      ));
    } else {
      return (
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {amount} USD
          </Typography>
        </ListItem>
      );
    }
  };

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Donation to" />
          <Typography variant="body2">{beneficiary.toLowerCase().includes("custom") ? `Custom Beneficiary: ${customBeneficiary}`: beneficiary}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Comments" />
          <Typography variant="body2">
            <em>{comments ? comments : "None"}</em>
          </Typography>
        </ListItem>
        {reviewAmount()}
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
        {
          isRecurring &&
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Recurring Receipt (Acknowledgement Letter) details  
          
          </Typography>
          
          {RowRadioButtonsGroup()}
        </div>
        }
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

function RowRadioButtonsGroup() {
  const errors = useErrorStore((state) => state);
  const setField = useFormStore((state) => state.setField);
  const recurTimes = useFormStore((state) => state.timesToRecur);
  const isIndefinite = recurTimes === 0; // Check if the recurring interval is indefinite

  return (
    <>
    <FormControl size="small" sx={{mt: "5px"}}>
      <FormLabel id="demo-row-radio-buttons-group-label" required>
      <Typography gutterBottom sx={{ color: "text.secondary", display: 'inline-flex', alignItems: 'center' }}>
          Get a receipt emailed for every donation or a consolidated email {isIndefinite ? "on December of the present year?" : `at the end of your ${recurTimes} time billing cycle?`}
          <Tooltip title={`For every recurring donation you make, we email a receipt you can use for tax purposes. Instead of getting emailed every time, you can just get a single one with all of the recurring donations totalled at the end of ${isIndefinite ? "the year on December" : "your billing cycle"}.`} placement="top" sx={{fontSize: "20px", ml: "3px", mb:"2px"}} arrow>
            <InfoOutlined />
          </Tooltip>
          </Typography>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{mt: "-15px"}}
        onChange={(event) => {setField("recurringEmailedReceiptFrequency", event.target.value)}}
      >
        <FormControlLabel value={`One consolidated email end of ${isIndefinite ? "year" : "billing cycle"}`} control={<Radio />} label={`consolidated (one ${isIndefinite ? "yearly" : ""} email${!isIndefinite ? " at the end": ""})`} />
        <FormControlLabel value="Email every donation" control={<Radio />} label="every donation" />
      </RadioGroup>
    </FormControl>
    {!!errors.recurringEmailedReceiptFrequency && (
              <FormHelperText error id="recurringEmailedReceiptFrequencyError">
                {errors.recurringEmailedReceiptFrequency}
              </FormHelperText>
            )}
    </>
  );
}
