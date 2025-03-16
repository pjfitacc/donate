import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel shrink={false} sx={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          {beneficiary.name ? "" : "Select Beneficiary"}
        </InputLabel>
        <Select
          fullWidth
          value={beneficiary.name}
          onChange={handleSelectChange}
          sx={{ minHeight: 'auto', whiteSpace: 'normal', wordWrap: 'break-word' }} // Enable text wrapping and vertical growth
        >
          {beneficiaries.map((beneficiaryItem) => (
            <MenuItem
              key={beneficiaryItem.name}
              value={beneficiaryItem.name}
              selected={beneficiaryItem.name === beneficiary.name}
            >
              {beneficiaryItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}

DonationInfo.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default DonationInfo;
