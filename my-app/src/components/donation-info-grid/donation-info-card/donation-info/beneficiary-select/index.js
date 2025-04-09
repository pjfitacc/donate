import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { beneficiaries } from "data/beneficiaries";
import useFormStore from "stores/formStore";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "1000px", // Set a higher maximum height for the dropdown
      width: 250,
    },
  },
};

function BeneficiarySelect({ editable }) {
  const beneficiary = useFormStore((state) => state.beneficiary);
  const setField = useFormStore((state) => state.setField);

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <FormLabel
        htmlFor="beneficiary"
        sx={{ mb: -1 }}
        required={editable ? true : false}
      >
        {!editable && "Selected "}Beneficiary
      </FormLabel>
      {editable && (
        <Select
          labelId="beneficiary"
          id="beneficiary"
          name="beneficiary"
          displayEmpty
          value={beneficiary}
          onChange={(e) => setField("beneficiary", e.target.value)}
          multiline
          input={<Input multiline />}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          label="Beneficiary"
          renderValue={(selected) => {
            if (selected.length === 0) {
              return (
                <Typography variant="subtitle2" sx={{ color: "gray" }}>
                  Select a Beneficiary...
                </Typography>
              );
            }

            return selected;
          }}
        >
          <MenuItem disabled value="">
            <em>Select a Beneficiary...</em>
          </MenuItem>
          {beneficiaries.map((beneficiaryItem) => (
            <MenuItem
              key={beneficiaryItem.name}
              value={beneficiaryItem.name}
              selected={beneficiaryItem.name === beneficiary}
              sx={{ width: "100%", whiteSpace: "normal" }} // Ensure items stretch and handle long text
            >
              {beneficiaryItem.name}
            </MenuItem>
          ))}
        </Select>
      )}
      {!editable && (
        <Input
          id="beneficiary"
          name="beneficiary"
          type="text"
          value={beneficiary}
          readOnly={!editable}
          disableUnderline={!editable}
          required
          multiline
        ></Input>
      )}
    </FormControl>
  );
}

export default BeneficiarySelect;
