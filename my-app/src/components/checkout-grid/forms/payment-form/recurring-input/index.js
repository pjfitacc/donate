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
import RecipeIDSelect from "./recipe-id-select";
import NumberOfIntervals from "./intervals-select";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

function RecurringInput() {
  const setField = useFormStore((state) => state.setField);
  setField("overrideRecurPrice", "Y");
  const timesToRecur = useFormStore((state) => state.timesToRecur);

  const recurAmount = useFormStore((state) => state.recurAmount);
  const initialIntervalAmount = useFormStore(
    (state) => state.initialIntervalAmount
  );
  const amount = useFormStore((state) => state.amount);

  if (initialIntervalAmount === null) {
    setField("initialIntervalAmount", amount);
  }

  // TODO:
  // 3. overrideRecurDay - "Y"/"N" if the donor wants to override the default RecurringRecipes cycleDay to today.

  const errors = useErrorStore((state) => state);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
        Donation Plan Setup
      </Typography>
      <Grid container spacing={3}>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <RecipeIDSelect />
        </FormGrid>
        <NumberOfIntervals
          timesToRecur={timesToRecur}
          setField={setField}
          errors={errors}
        />
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="initialIntervalAmount" required>
            Initial donation amount on submit (USD)
          </FormLabel>
          <OutlinedInput
            id="initialIntervalAmount"
            name="initialIntervalAmount"
            value={initialIntervalAmount}
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
            Price per Interval (USD)
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
    </Box>
  );
}

export default RecurringInput;
