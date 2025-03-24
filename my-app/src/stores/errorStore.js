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
  comments: "",
  ccNumber: "",
  cvv: "",
  ccName: "",
  ccExpDate: "",

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
      comments: "",
      ccNumber: "",
      cvv: "",
      ccName: "",
      ccExpDate: "",
    })),
}));

export default useErrorStore;
