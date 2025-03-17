import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { beneficiaries } from '../data/beneficiaries';
import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '1000px', // Set a higher maximum height for the dropdown
      width: 250,
    },
  },
};

export default function BeneficiaryTextSelect({beneficiary, setBeneficiary}) {
  const [inputValue, setInputValue] = React.useState('');
  const handleSelectChange = (event) => {
    const selectedLabel = event.target.label;
    setBeneficiary(selectedLabel);
  };

  return (
    <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel shrink={false} sx={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {(beneficiary !== '' | inputValue !== '') ? "" : "Select Beneficiary"}
        </InputLabel>
      <Autocomplete
        freeSolo
        value={beneficiary}
        onChange={handleSelectChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        MenuProps={MenuProps}
        input={<OutlinedInput />}
        disablePortal
        options={beneficiaries}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} />} 
        />
    </FormControl>
  );
}

