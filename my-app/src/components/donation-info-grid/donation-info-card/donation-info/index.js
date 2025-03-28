import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import BeneficiarySelect from "./beneficiary-select";
import { FormControl, FormHelperText, Input } from "@mui/material";
import useFormStore from "stores/formStore";
import useErrorStore from "stores/errorStore";

function DonationInfo({ editable }) {
  const comments = useFormStore((state) => state.comments);
  const setField = useFormStore((state) => state.setField);

  const errors = useErrorStore((state) => state);

  return (
    <React.Fragment>
      {BeneficiarySelect({ editable })}
      {!!errors.beneficiary && (
        <FormHelperText error id="beneficiaryError" sx={{ mb: 3, mt: -3 }}>
          Please select a beneficiary
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
