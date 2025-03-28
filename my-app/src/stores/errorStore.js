import { create } from "zustand";

const useErrorStore = create((set, get) => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  acceptTerms: "",
  amount: "",
  beneficiary: "",
  customBeneficiary: "", // Used for custom beneficiaries
  comments: "",
  ccNumber: "",
  cvv: "",
  ccName: "",
  ccExpDate: "",
  recipeID: "",
  timesToRecur: "",
  overrideRecurPrice: "",
  overrideRecurDay: "",
  initialIntervalAmount: "",
  recurAmount: "",
  recurringEmailedReceiptFrequency: "",

  // Getters
  getFormData: () => get(),
  getField: (field) => get()[field],

  // Setters
  setField: (field, value) => set(() => ({ [field]: value })),
  setFormData: (data) => set(() => ({ ...data })),
  resetForm: () =>
    set(() => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      acceptTerms: "",
      amount: "",
      beneficiary: "",
      customBeneficiary: "", // Used for custom beneficiaries
      comments: "",
      ccNumber: "",
      cvv: "",
      ccName: "",
      ccExpDate: "",
      recipeID: "",
      timesToRecur: "",
      overrideRecurPrice: "",
      overrideRecurDay: "",
      initialIntervalAmount: "",
      recurAmount: "",
      recurringEmailedReceiptFrequency: "", // Resetting the recurring emailed receipt frequency
    })),
}));

export default useErrorStore;
