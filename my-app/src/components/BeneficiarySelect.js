import React from "react";
import { beneficiaries } from "../data/beneficiaries";
import {
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "1000px", // Set a higher maximum height for the dropdown
      width: 250,
    },
  },
};

function BeneficiarySelect({ donation, handleChange, errors, editable }) {
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <FormLabel htmlFor="beneficiary" sx={{ mb: -1 }} required>
        Beneficiary
      </FormLabel>
      {editable && (
        <Select
          labelId="beneficiary"
          id="beneficiary"
          name="beneficiary"
          displayEmpty
          value={donation.beneficiary}
          onChange={handleChange}
          input={<Input />}
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
              selected={beneficiaryItem.name === donation.beneficiary}
              sx={{ width: "100%", whiteSpace: "normal" }} // Ensure items stretch and handle long text
            >
              {beneficiaryItem.name}
            </MenuItem>
          ))}
        </Select>
      )}
      {!editable && (
        <Input
          sx={{ fontWeight: "bold" }}
          id="beneficiary"
          name="beneficiary"
          type="text"
          value={donation.beneficiary}
          onChange={handleChange}
          readOnly={!editable}
          disableUnderline={!editable}
          required
        ></Input>
      )}
    </FormControl>
  );
}

export default BeneficiarySelect;
