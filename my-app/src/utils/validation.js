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
export const validateDonation = (donor, donation) => {
  let errors = {};

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(donor.email)) {
    errors.email = "Invalid email format";
  }

  if (donation.amount < 0) {
    errors.amount = "Donation amount must be greater than 0";
  }

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in donor) {
    if (!donor[key] && key !== 'phone') {
      errors[key] = "This field is required";
    }
  }

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in donation) {
    if (!donation[key] && key !== 'comments') {
      errors[key] = "This field is required";
    }
  }
  

  return errors;
};
  