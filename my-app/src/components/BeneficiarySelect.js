import { beneficiaries } from "../data/beneficiaries";
import { FilledInput, FormControl, FormLabel, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '1000px', // Set a higher maximum height for the dropdown
      width: 250,
    },
  },
};

function BeneficiarySelect({ donation, handleChange }) {
    

    return(
        <FormControl fullWidth>
        <FormLabel htmlFor="beneficiary" required>
        Beneficiary
        </FormLabel>
        <Select
            labelId="beneficiary"
            id="beneficiary"
            name="beneficiary"
            displayEmpty
            value={donation.beneficiary}
            onChange={handleChange}
            input={<Input  sx={{ my: 2 }}/>}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            label="Beneficiary"
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <Typography variant="subtitle2" sx={{ color: 'gray' }}>Select a Beneficiary...</Typography>;
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
                sx={{ width: '100%', whiteSpace: 'normal' }} // Ensure items stretch and handle long text
            >
                {beneficiaryItem.name}
            </MenuItem>
            ))}
        </Select>
      </FormControl>
    )
}

export default BeneficiarySelect;