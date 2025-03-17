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
        {/* <InputLabel shrink={false} sx={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {beneficiary.name ? "" : "Select Beneficiary"}
        </InputLabel> */}
        <FormLabel htmlFor="beneficiary" required>
        Beneficiary
        </FormLabel>
        {/* <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Beneficiary
      </Typography> */}
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
        >
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