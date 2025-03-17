import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { beneficiaries } from '../data/beneficiaries';
import BeneficiarySelect from './BeneficiarySelect';


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
      {BeneficiarySelect({ handleSelectChange, beneficiary })}
      
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
