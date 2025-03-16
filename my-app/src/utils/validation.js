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
  

// Only thing not required is the phone.
export const validateDonor = (donor) => {
  let errors = {};

  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(donor.email)) {
    errors.email = "Invalid email format";
  }

  // Make a for loop that adds an error message to the errors object if the value of the key is empty.
  for (const key in donor) {
    if (!donor[key] && key !== 'phone') {
      errors[key] = "This field is required";
    }
  }
  

  return errors;
};
  