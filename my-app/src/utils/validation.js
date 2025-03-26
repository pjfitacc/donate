import { donationModel, donorModel, paymentModel } from "components/models";
import useFormStore from "stores/formStore";

// Only thing not required is the phone.
export const validateForm = (activeStep) => {
  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  const form = useFormStore.getState();
  switch (activeStep) {
    case 0:
      return findDonorAndDonationErrors(form);
    case 1:
      return findPaymentErrors(form);
    default:
      return {};
  }
};

function findDonorAndDonationErrors(form) {
  let errors = {};

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
    errors.email = "Invalid email format";
  }

  if (form.amount < 0) {
    errors.amount = "Donation amount must be greater than 0";
  }

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in donorModel) {
    if (!form[key] && key !== "phone") {
      errors[key] = "This field is required";
    }
  }

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in donationModel) {
    if (!form[key] && key !== "comments") {
      errors[key] = "This field is required";
    }
  }

  return errors;
}

export const cardPatterns = {
  Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  Mastercard: /^5[1-5][0-9]{14}$/,
  Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  Amex: /^3[47][0-9]{13}$/,
};

function findPaymentErrors(form) {
  let errors = {};

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in paymentModel) {
    if (!form[key]) {
      errors[key] = "This field is required";
    }
  }

  // Validate credit card number

  const { ccNumber, cvv, ccExpDate } = form;

  const digitsOnlyCCNumber = ccNumber.replace(/\D/g, "");

  if (
    !ccNumber ||
    !/^[0-9]{13,16}$/.test(digitsOnlyCCNumber) ||
    !Object.values(cardPatterns).some((pattern) =>
      pattern.test(digitsOnlyCCNumber)
    )
  ) {
    errors.ccNumber = "Invalid or unsupported credit card number.";
  }

  // Validate CVV
  if (!cvv || !/^[0-9]{3,4}$/.test(cvv)) {
    errors.cvv = "Invalid CVV. Must be 3 or 4 digits.";
  }

  // Validate Expiration Date (MM/YY format)
  if (!ccExpDate || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(ccExpDate)) {
    errors.ccExpDate = "Invalid expiration date format. Use MM/YY.";
  } else {
    // Check if the card is expired
    const [month, year] = ccExpDate.split("/").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of year
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-based

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      errors.ccExpDate = "Credit card is expired.";
    }
  }

  return errors;
}

// jsonResponse should be: https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
export function validateQuantumGatewayResponse(jsonResponse) {
  if (!("quantumGatewayTransactionResponse" in jsonResponse)) {
    throw new Error("Unable to retrieve response from our Payment Gateway.");
  }

  const qgwTransResponse = jsonResponse["quantumGatewayTransactionResponse"];

  if (!Array.isArray(qgwTransResponse)) {
    throw new Error("Invalid response from our Payment Gateway.");
  }

  if (qgwTransResponse.length === 0) {
    throw new Error("Empty transaction response from our Payment Gateway");
  }

  if (qgwTransResponse[0] === "DECLINED") {
    throw new Error(
      `DECLINED: ${
        qgwTransResponse[Math.max(0, qgwTransResponse.length - 2)]
      } ${qgwTransResponse[Math.max(0, qgwTransResponse.length - 1)]}`
    );
  }

  if (qgwTransResponse[0] !== "APPROVED") {
    throw new Error("Improper formatting from our Payment Gateway.");
  }
}
