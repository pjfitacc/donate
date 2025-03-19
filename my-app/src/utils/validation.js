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

// const [donation, setDonation] = React.useState(
//     {
//       amount: 10,
//       beneficiary: '',
//       comments: '',
//     }
//   );

// Only thing not required is the phone.
export const validateForm = (formData, activeStep) => {
  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  switch (activeStep) {
    case 0:
      return findDonorAndDonationErrors(formData);
    case 1:
      return findPaymentErrors(formData);
  }
};

function findDonorAndDonationErrors(formData) {
  let errors = {};

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (formData.amount < 0) {
    errors.amount = "Donation amount must be greater than 0";
  }

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in formData) {
    if (!formData[key] && key !== "phone") {
      errors[key] = "This field is required";
    }
  }

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in formData) {
    if (!formData[key] && key !== "comments") {
      errors[key] = "This field is required";
    }
  }

  return errors;
}

// TODO:
function findPaymentErrors(formData) {
  let errors = {};
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
