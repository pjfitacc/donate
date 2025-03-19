import isDev from "../utils/DevDetect";

export const submitForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  acceptTerms: false,
  amount: 10,
  beneficiary: "",
  comments: "",
};

const initialDonor = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  acceptTerms: false,
};

const fakeFilledDonor = {
  firstName: "Random",
  lastName: "Person",
  email: "email@email.com",
  phone: "1234567890",
  address: "123 Street",
  city: "New York",
  state: "New York",
  zip: "12312",
  country: "US",
  acceptTerms: true,
};

export const donorModel = isDev() ? fakeFilledDonor : initialDonor;

const initialDonation = {
  amount: 10,
  beneficiary: "",
  comments: "",
};

const fakeFilledDonation = {
  amount: 1000,
  beneficiary: "Ateneo de Manila University",
  comments: "Please donate it to this sponsor!",
};

export const donationModel = isDev() ? fakeFilledDonation : initialDonation;
