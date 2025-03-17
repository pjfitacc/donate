import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '1000px', // Set a higher maximum height for the dropdown
      width: 250,
    },
  },
};

const beneficiaries = [
  {
    name: 'No preference. Let PJF decide for me.',
    price: '10.00',
  },
  {
    "name": "Philippine Jesuits' Aged and Infirm Fund (for our Sick and Senior Jesuits)",
    "price": "10.00"
  },
  {
    "name": "Philippine Jesuits' Formation Fund (for the Education and Support of our Young Jesuits)",
    "price": "10.00"
  },
  {
    "name": "Philippine Jesuits' Apostolate Fund (for our Works and Ministries)",
    "price": "10.00"
  },
  {
    "name": "Ateneo de Manila University",
    "price": "10.00"
  },
  {
    "name": "Ateneo de Davao University",
    "price": "10.00"
  },
  {
    "name": "Ateneo de Naga University",
    "price": "10.00"
  },
  {
    "name": "Ateneo de Zamboanga University",
    "price": "10.00"
  },
  {
    "name": "Xavier University",
    "price": "10.00"
  },
  {
    "name": "San Jose Seminary",
    "price": "10.00"
  },
  {
    "name": "Jesuit Volunteers Philippines",
    "price": "10.00"
  },
  {
    "name": "Philippine Jesuit Prison Service",
    "price": "10.00"
  },
  {
    "name": "Tanging Yaman Foundation",
    "price": "10.00"
  }
];

function DonationInfo({ totalPrice, beneficiary, setBeneficiary }) {
  const handleSelectChange = (event) => {
    const selectedName = event.target.value;
    setBeneficiary(beneficiaries.find((beneficiary) => beneficiary.name === selectedName));
  };

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Donation Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>

      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Beneficiary
      </Typography>
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
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Comments
      </Typography>
    </React.Fragment>
  );
}

DonationInfo.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default DonationInfo;
