import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { FormHelperText, Link } from '@mui/material';


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));



export default function DonorForm({ donor, setDonor, errors }) {
  // Handlers to update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setDonor((prevData) => ({
      ...prevData,
      acceptTerms: checked,
    }));
  };

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="firstName" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="firstName"
          name="firstName"
          value={donor.firstName}
          onChange={handleChange}
          type="name"
          autoComplete="first name"
          required
          size="small"
          style={{ borderColor: errors.firstName ? 'red' : '' }}
        />
        {!!errors.firstName && (
            <FormHelperText error id="firstNameError">
              {errors.firstName}
            </FormHelperText>
          )}
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="lastName" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="lastName"
          name="lastName"
          value={donor.lastName}
          onChange={handleChange}
          type="lastName"
          autoComplete="last name"
          required
          size="small"
          error={!!errors.lastName}
          style={{ borderColor: errors.lastName ? 'red' : '' }}
        />
        {!!errors.firstName && (
            <FormHelperText error id="firstNameError">
              {errors.firstName}
            </FormHelperText>
          )}
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="email" required>Email</FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          value={donor.email}
          onChange={handleChange}
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          required
          size="small"
          error={!!errors.email}
          style={{ borderColor: errors.email ? 'red' : '' }}
        />
        {!!errors.firstName && (
            <FormHelperText error id="firstNameError">
              {errors.firstName}
            </FormHelperText>
          )}
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="phone" >Phone</FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          value={donor.phone}
          onChange={handleChange}
          type="phone"
          autoComplete="phone"
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address" required>
          Address
        </FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          value={donor.address}
          onChange={handleChange}
          type="address"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          size="small"
          error={!!errors.address}
          style={{ borderColor: errors.address ? 'red' : '' }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          value={donor.city}
          onChange={handleChange}
          type="city"
          placeholder="New York"
          autoComplete="City"
          required
          size="small"
          error={!!errors.city}
          style={{ borderColor: errors.city ? 'red' : '' }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          value={donor.state}
          onChange={handleChange}
          type="state"
          placeholder="NY"
          autoComplete="State"
          required
          size="small"
          error={!!errors.state}
          style={{ borderColor: errors.state ? 'red' : '' }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          value={donor.zip}
          onChange={handleChange}
          type="zip"
          placeholder="10028"
          autoComplete="shipping postal-code"
          required
          size="small"
          error={!!errors.zip}
          style={{ borderColor: errors.zip ? 'red' : '' }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          value={donor.country}
          onChange={handleChange}
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
          error={!!errors.country}
          style={{ borderColor: errors.country ? 'red' : '' }}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="acceptTerms" checked={donor.acceptTerms}
          onChange={handleCheckboxChange} value="no" />}
          label={
            <span>
            I agree to the{" "}
            <Link href="https://www.phjesuits.org/portal/website-terms-and-conditions/" target="_blank" rel="noopener" color="blue">
              Terms and Conditions
            </Link>
          </span>
          }
        />
      </FormGrid>
    </Grid>
  );
}
