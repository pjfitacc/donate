import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import BeneficiarySelect from "./beneficiary-select";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/material";
import { DonationContext } from "../../../../Checkout";

function DonationInfo({ errors, editable }) {
  const [donation, setDonation] = React.useContext(DonationContext);

  // Handlers to update form fields
  const handleChange = React.useCallback(
    (e) => {
      const { name, value } = e.target;
      setDonation((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [donation]
  );
  return (
    <React.Fragment>
      {BeneficiarySelect({ donation, handleChange, errors, editable })}
      {!!errors.beneficiary && (
        <FormHelperText error id="beneficiaryError" sx={{ mb: 3, mt: -3 }}>
          Please select a beneficiary
        </FormHelperText>
      )}

      <FormControl sx={{ mb: 4 }} fullWidth>
        <FormLabel
          htmlFor={editable ? "amount" : ""}
          sx={{ mb: -1 }}
          required={editable ? true : false}
        >
          {!editable && "Selected "}Donation Total (USD)
        </FormLabel>

        <Input
          sx={{ fontWeight: editable ? "" : "bold" }}
          id="amount"
          name="amount"
          type={editable ? "number" : "text"}
          defaultValue={donation.amount}
          value={donation.amount}
          onChange={handleChange}
          readOnly={!editable}
          disableUnderline={!editable}
          required
        ></Input>
      </FormControl>
      {!!errors.amount && (
        <FormHelperText error id="amountError" sx={{ mb: 3, mt: -3 }}>
          {errors.amount}
        </FormHelperText>
      )}

      <FormControl fullWidth>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", mb: -1 }}
        >
          Comments
        </Typography>
        <Input
          multiline
          sx={{ my: 2, fontWeight: editable ? "" : "bold" }}
          id="comments"
          name="comments"
          type="text"
          defaultValue={donation.comments}
          value={donation.comments}
          onChange={handleChange}
          readOnly={!editable}
          disableUnderline={!editable}
          placeholder="Indicate special instructions or requests you may have regarding your donation here. You can also specify other Jesuit-related beneficiaries not listed above..."
        ></Input>
      </FormControl>
    </React.Fragment>
  );
}

DonationInfo.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default DonationInfo;
