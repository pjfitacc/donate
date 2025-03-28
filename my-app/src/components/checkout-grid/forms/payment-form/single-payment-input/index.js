import useErrorStore from "stores/errorStore";
import useFormStore from "stores/formStore";

const {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} = require("@mui/material");
const { default: React } = require("react");

function SinglePaymentInput() {
  console.log("formStore", useFormStore.getState());
  const amount = useFormStore((state) => state.amount);
  const setField = useFormStore((state) => state.setField);
  const errors = useErrorStore((state) => state);

  return (
    <>
      <FormControl fullWidth>
        <FormLabel htmlFor="amount" sx={{ mb: -1 }} required>
          Donation Total (USD)
        </FormLabel>

        <Input
          id="amount"
          name="amount"
          type="number"
          defaultValue={"10"}
          value={amount}
          onChange={(e) => setField("amount", e.target.value)}
          required
        ></Input>
      </FormControl>
      {!!errors.amount && (
        <FormHelperText error id="amountError" sx={{ mt: -3 }}>
          {errors.amount}
        </FormHelperText>
      )}
    </>
  );
}

export default SinglePaymentInput;
