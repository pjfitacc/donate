import { beneficiaries } from "../data/beneficiaries";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '1000px', // Set a higher maximum height for the dropdown
      width: 250,
    },
  },
};

function BeneficiarySelect({ handleSelectChange, beneficiary }) {
    return(
        <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel shrink={false} sx={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {beneficiary.name ? "" : "Select Beneficiary"}
        </InputLabel>
        <Select
            displayEmpty
            value={beneficiary.name}
            onChange={handleSelectChange}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden', 
            textOverflow: 'ellipsis',
            }}
        >
            {beneficiaries.map((beneficiaryItem) => (
            <MenuItem
                key={beneficiaryItem.name}
                value={beneficiaryItem.name}
                selected={beneficiaryItem.name === beneficiary.name}
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