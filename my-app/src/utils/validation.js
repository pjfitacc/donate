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
  
  export const validateDonor = (donor) => {
    let errors = {};
  
    if (!donor.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    
    if (!donor.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(donor.email)) {
      errors.email = "Invalid email format";
    }
  
    return errors;
  };
  