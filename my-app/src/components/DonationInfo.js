import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { beneficiaries } from '../data/beneficiaries';
import BeneficiarySelect from './BeneficiarySelect';
import { FormControl, FormGroup, FormHelperText, FormLabel, Input, OutlinedInput } from '@mui/material';


function DonationInfo({ donation, setDonation, errors }) {
  // Handlers to update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonation((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      {BeneficiarySelect({ donation, handleChange })}
      {!!errors.beneficiary && (
            <FormHelperText error id="beneficiaryError" sx={{mb: 3, mt: -3}}>
              Please select a beneficiary
            </FormHelperText>
          )}
      
      <FormControl sx={{mb: 4}}>
      <FormLabel htmlFor="amount" sx={{mb:-1}}required>
        Donation Total (USD)
        </FormLabel>

      <Input id="amount" name="amount" type='number' defaultValue={donation.amount} value={donation.amount} onChange={handleChange} required></Input>
      </FormControl>
        {!!errors.amount && (
            <FormHelperText error id="amountError" sx={{mb: 3, mt: -3}}>
              {errors.amount}
            </FormHelperText>
          )}

      
      <FormControl fullWidth>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: -1 }}>
        Comments
      </Typography>
      <Input multiline sx={{my: 2}} id="comments" name="comments" type='text' defaultValue={donation.comments} value={donation.comments} onChange={handleChange} placeholder='Indicate special instructions or requests you may have regarding your donation here. You can also specify other Jesuit-related beneficiaries not listed above...'></Input>
      </FormControl>

    </React.Fragment>
  );
}

DonationInfo.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default DonationInfo;
