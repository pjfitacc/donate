import { fakeFilledForm } from "data/fakeFormData";
import isDev from "utils/DevDetect";
import { create } from "zustand";

// Define the initial state
const initialState = {
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
  ccNumber: "",
  cvv: "",
  ccName: "",
  ccExpDate: "",
};

// Merge the fakeFilledDonor object with the initial state if in development
const initialData = isDev()
  ? { ...initialState, ...fakeFilledForm }
  : initialState;

const useFormStore = create((set, get) => ({
  ...initialData,

  // Getters
  getFormData: () => get(),
  getField: (field) => get()[field],

  // Setters
  setField: (field, value) => set(() => ({ [field]: value })),
  setFormData: (data) => set(() => ({ ...data })),
  resetForm: () => set(() => initialState),
}));

export default useFormStore;
