import { mapFormValuesToQGWdbeFields } from "constants/mapping";
import useFormStore from "formStore";
import React, { forwardRef } from "react";

const HiddenSubmitForm = forwardRef((_, ref) => {
  const form = useFormStore((state) => state);
  // Generate hidden inputs from mapped form values
  const hiddenInputs = Object.entries(mapFormValuesToQGWdbeFields(form)).map(
    ([key, value]) => <input key={key} type="hidden" name={key} value={value} />
  );

  return (
    <form
      ref={ref}
      method="POST"
      action="https://secure.quantumgateway.com/cgi/qgwdbe.php"
    >
      {hiddenInputs}
    </form>
  );
});

export default HiddenSubmitForm;
