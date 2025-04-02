import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import BeneficiarySelect from "./beneficiary-select";
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/material";
import useFormStore from "stores/formStore";
import useErrorStore from "stores/errorStore";

function DonationInfo({ editable }) {
  const comments = useFormStore((state) => state.comments);
  const setField = useFormStore((state) => state.setField);
  const beneficiary = useFormStore((state) => state.beneficiary);
  const customBeneficiary = useFormStore((state) => state.customBeneficiary); // Used for custom beneficiaries

  const errors = useErrorStore((state) => state);

  return (
    <React.Fragment>
      {BeneficiarySelect({ editable })}
      {!!errors.beneficiary && (
        <FormHelperText error id="beneficiaryError" sx={{ mb: 3, mt: -3 }}>
          Please select a beneficiary
        </FormHelperText>
      )}

      {/* If the beneficiary contains the word "custom" render an additional input element */}
      {/* This is to handle custom beneficiaries */}
      {beneficiary && beneficiary.toLowerCase().includes("custom") && (
        <>
        <FormControl fullWidth sx={{ mb: 4 }} required>
          <FormLabel
            htmlFor="beneficiary"
            sx={{ mb: -1 }}
            required={editable ? true : false}
          >
            {!editable && "Selected "}Custom Beneficiary
          </FormLabel>
          <Input
            multiline
            sx={{ my: 2}}
            id="customBeneficiary"
            name="customBeneficiary"
            type="text"
            defaultValue={customBeneficiary} // Use comments to store the custom beneficiary
            value={customBeneficiary} // Use comments to store the custom beneficiary
            onChange={(e) => setField("customBeneficiary", e.target.value)} // Update the comments field
            readOnly={!editable} // Make it read-only if not editable
            disableUnderline={!editable} // Disable underline if not editable
            placeholder={
              editable
                ? "Please specify the name of the custom beneficiary."
                : "Custom beneficiary specified in comments"

            }
          ></Input>
          </FormControl>
          {!!errors.customBeneficiary && (
        <FormHelperText error id="customBeneficiaryError" sx={{ mb: 3, mt: -3 }}>
          Please specfiy a custom Beneficiary
        </FormHelperText>
      )}
        </>
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
          sx={{ my: 2}}
          id="comments"
          name="comments"
          type="text"
          defaultValue={comments}
          value={comments}
          onChange={(e) => setField("comments", e.target.value)}
          readOnly={!editable}
          disableUnderline={!editable}
          placeholder={
            editable
              ? "Indicate special instructions or requests you may have regarding your donation here. You can also specify other Jesuit-related beneficiaries not listed above..."
              : ""
          }
        ></Input>
      </FormControl>
    </React.Fragment>
  );
}

DonationInfo.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default DonationInfo;
