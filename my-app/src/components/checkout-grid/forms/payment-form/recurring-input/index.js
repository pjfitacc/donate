import {
  FormHelperText,
  FormLabel,
  OutlinedInput,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import React from "react";
import useFormStore from "stores/formStore";
import useErrorStore from "stores/errorStore";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

function RecurringInput() {
  const setField = useFormStore((state) => state.setField);
  setField("overrideRecurPrice", "Y");

  const recurAmount = useFormStore((state) => state.recurAmount);
  const initialIntervalAmount = useFormStore(
    (state) => state.initialIntervalAmount
  );
  const amount = useFormStore((state) => state.amount);

  const errors = useErrorStore((state) => state);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
        Donation Plan Setup
      </Typography>
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="initialIntervalAmount" required>
            Custom Interval 1 Price
          </FormLabel>
          <OutlinedInput
            id="initialIntervalAmount"
            name="initialIntervalAmount"
            value={
              initialIntervalAmount === null ? amount : initialIntervalAmount
            }
            onChange={(e) => setField("initialIntervalAmount", e.target.value)}
            type="number"
            autoComplete="number"
            required
            size="small"
            error={!!errors.initialIntervalAmount}
            style={{ borderColor: errors.initialIntervalAmount ? "red" : "" }}
          />
          {!!errors.initialIntervalAmount && (
            <FormHelperText error id="initialIntervalAmountError">
              {errors.initialIntervalAmount}
            </FormHelperText>
          )}
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="recurAmount" required>
            Price per Interval
          </FormLabel>
          <OutlinedInput
            id="recurAmount"
            name="recurAmount"
            value={recurAmount}
            onChange={(e) => setField("recurAmount", e.target.value)}
            type="number"
            required
            size="small"
            style={{ borderColor: errors.recurAmount ? "red" : "" }}
          />
          {!!errors.recurAmount && (
            <FormHelperText error id="recurAmountError">
              {errors.recurAmount}
            </FormHelperText>
          )}
        </FormGrid>
      </Grid>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Default Options:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Monthly, Quarterly, Yearly
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Payment Start Date:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          May 4th 2025 (info ?)
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Frequency:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Weekly
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          End of Recurring Cycle:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          June 2025
        </Typography>
      </Box>
    </Box>
  );
}

export default RecurringInput;
