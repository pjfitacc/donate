// const [donor, setDonor] = React.useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//     acceptTerms: false,
//   });

import { donationModel, donorModel, paymentModel } from "components/models";
import useFormStore from "formStore";

// const [donation, setDonation] = React.useState(
//     {
//       amount: 10,
//       beneficiary: '',
//       comments: '',
//     }
//   );

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

  if (
    !ccNumber ||
    !/^[0-9]{13,16}$/.test(ccNumber) ||
    !Object.values(cardPatterns).some((pattern) => pattern.test(ccNumber))
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

// const handleCardNumberChange = (event, name) => {
//   const value = event.target.value.replace(/\D/g, "");
//   const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
//   if (value.length <= 16) {
//     setPayment((prevData) => ({
//       ...prevData,
//       [name]: formattedValue,
//     }));
//   }
// };

// const handleCvvChange = (event, name) => {
//   const value = event.target.value.replace(/\D/g, "");
//   if (value.length <= 3) {
//     setPayment((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }
// };

// const handleExpirationDateChange = (event, name) => {
//   const value = event.target.value.replace(/\D/g, "");
//   const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
//   if (value.length <= 4) {
//     setPayment((prevData) => ({
//       ...prevData,
//       [name]: formattedValue,
//     }));
//   }
// };
