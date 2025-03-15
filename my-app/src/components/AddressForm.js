import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          autoComplete="last name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="email" required>Email</FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          autoComplete="shipping address-line2"
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>

        <FormLabel htmlFor="phone" >Phone</FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          autoComplete="phone"
          size="small"
        />
      </FormGrid>

      
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Address
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Street name and number"
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="New York"
          autoComplete="City"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="NY"
          autoComplete="State"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="10028"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="acceptTerms" value="no" />}
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
