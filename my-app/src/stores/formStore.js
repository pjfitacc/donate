import { fakeFilledForm } from "data/fake";
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
  customBeneficiary: "", // Used for custom beneficiaries
  comments: "",
  ccNumber: "",
  cvv: "",
  ccName: "",
  ccExpDate: "",
  recipeID: "4",
  timesToRecur: 0,
  overrideRecurPrice: "N",
  overrideRecurDay: "N",
  initialIntervalAmount: null,
  recurAmount: 10,
  recurringEmailedReceiptFrequency: "",
  isRecurring: false,
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
  clearRecurringFields: () =>
    set(() => ({
      recipeID: "",
      timesToRecur: "",
      overrideRecurPrice: "",
      overrideRecurDay: "",
      initialIntervalAmount: "",
      recurAmount: "",
    })),
  resetForm: () => set(() => initialState),
}));

export default useFormStore;
