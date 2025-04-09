import { useState } from "react";
import {
  FormLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Grid2 as Grid,
  styled,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { calculateRecurringDates } from "utils/calendarCalculations";
import { RecurringRecipeIDs } from "constants/quantumGateway";
import useFormStore from "stores/formStore";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const NumberOfIntervals = ({ timesToRecur, setField, errors }) => {
  const [mode, setMode] = useState(
    timesToRecur === 0 ? "indefinite" : "setAmount"
  );

  const recipeID = useFormStore((state) => state.recipeID);
  const recurringDates = calculateRecurringDates(
    recipeID,
    timesToRecur,
    RecurringRecipeIDs
  );
  const lastRecurringDate = recurringDates[recurringDates.length - 1];
  const lastRecurringDateString = lastRecurringDate.toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  );
  const lastRecurringDateMessage =
    mode === "setAmount"
      ? ` (Last Recurring Donation Date: ${lastRecurringDateString})`
      : "";

  const handleModeChange = (e) => {
    const newMode = e.target.value;
    setMode(newMode);

    if (newMode === "indefinite") {
      setField("timesToRecur", 0);
    } else {
      setField("timesToRecur", 1); // Reset input when switching
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (value != "" && value < 1) {
      setMode("indefinite");
      setField("timesToRecur", 0);
      return;
    }

    setField("timesToRecur", value);
  };

  return (
    <FormGrid size={{ xs: 12, md: 6 }}>
      <FormLabel htmlFor="timesToRecur" required>
        Number of Intervals {lastRecurringDateMessage}
      </FormLabel>
      <FormControl
        variant="outlined"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {/* Left Half - Select */}
        <Select
          value={mode}
          onChange={handleModeChange}
          size="small"
          style={{
            flex: 1,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRight: "none",
          }}
        >
          <MenuItem value="indefinite">Indefinite (Until Cancelled)</MenuItem>
          <MenuItem value="setAmount">Set Amount</MenuItem>
        </Select>

        {/* Right Half - Number Input */}
        <OutlinedInput
          value={mode === "indefinite" ? "♾️" : timesToRecur}
          onChange={handleNumberChange}
          type={mode === "indefinite" ? "text" : "number"}
          size="small"
          readOnly={mode === "indefinite"}
          inputProps={{ min: 1 }}
          style={{
            flex: 1,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
        />
      </FormControl>
      {!!errors.timesToRecur && (
        <FormHelperText error id="timesToRecurError">
          {errors.timesToRecur}
        </FormHelperText>
      )}
    </FormGrid>
  );

  //   return (
  //     <>
  //       <FormGrid size={{ xs: 12, md: changingMediumGridSize }}>
  //         <FormLabel htmlFor="timesToRecur" required>
  //           Number of Intervals
  //         </FormLabel>
  //         <Select
  //           fullWidth
  //           value={mode}
  //           onChange={handleModeChange}
  //           input={<Input multiline />}
  //           error={!!errors.timesToRecur}
  //         >
  //           <MenuItem value="indefinite">Indefinite (Until Cancelled)</MenuItem>
  //           <MenuItem value="setAmount">Set Amount</MenuItem>
  //         </Select>

  // {!!errors.timesToRecur && (
  //   <FormHelperText error id="timesToRecurError">
  //     {errors.timesToRecur}
  //   </FormHelperText>
  // )}
  //       </FormGrid>
  //       {mode === "setAmount" && (
  //         <FormGrid size={{ xs: 12, md: 4 }}>
  //           <FormLabel htmlFor="timesToRecur" required>
  //             Number of Intervals
  //           </FormLabel>
  //           <OutlinedInput
  //             id="timesToRecur"
  //             name="timesToRecur"
  //             value={timesToRecur}
  //             onChange={handleNumberChange}
  //             type="number"
  //             autoComplete="off"
  //             required
  //             size="small"
  //             error={!!errors.timesToRecur}
  //             inputProps={{ min: 1 }}
  //           />
  //         </FormGrid>
  //       )}
  //     </>
  //   );
};

export default NumberOfIntervals;
