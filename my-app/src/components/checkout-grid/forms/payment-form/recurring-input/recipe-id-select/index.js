import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useFormStore from "stores/formStore";
import { RecurringRecipeIDs } from "constants/quantumGateway";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "1000px", // Set a higher maximum height for the dropdown
      width: 250,
    },
  },
};

function RecipeIDSelect() {
  const recipeID = useFormStore((state) => state.recipeID);
  const setField = useFormStore((state) => state.setField);
  const recipes = RecurringRecipeIDs;

  return (
    <FormControl>
      <FormLabel htmlFor="recipeID" sx={{ mb: -1 }} required>
        Donation Frequency
      </FormLabel>
      <Select
        labelId="recipeID"
        id={recipeID}
        name="recipeID"
        displayEmpty
        value={recipeID}
        onChange={(e) => setField("recipeID", e.target.value)}
        multiline
        input={<Input multiline />}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
        label="recipeID"
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Typography variant="subtitle2" sx={{ color: "gray" }}>
                Select a Frequency...
              </Typography>
            );
          }

          return recipes[recipeID].type;
        }}
      >
        <MenuItem disabled value="">
          <em>Select a Frequency...</em>
        </MenuItem>
        {Object.entries(recipes).map(([rid, recipeSettings]) => (
          <MenuItem
            key={rid}
            value={rid}
            selected={rid === recipeID}
            sx={{ width: "100%", whiteSpace: "normal" }} // Ensure items stretch and handle long text
          >
            {recipeSettings.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default RecipeIDSelect;
