import { OptionalQGWdbeFields, RequiredQGWdbeFields } from "../constants/quantumGateway";

//  FORM VALUES to QGWdb Engine Fields Mapping
//   firstName: "", // FNAME
//   lastName: "", // LNAME
//   email: "", // BCUST_EMAIL
//   phone: "", // phone
//   address: "", // BADDR1
//   city: "", // BCITY
//   state: "", // BSTATE
//   zip: "", // BZIP1
//   country: "", // BCOUNTRY
//   acceptTerms: false,
//   amount: 10, // amount
//   beneficiary: "", // UserVar_beneficiary, CustomerVar_beneficiary, invoice_description
//   comments: "", // UserVar_comments, CustomerVar_comments, invoice_description
//   ccNumber: "", // ccnum
//   cvv: "", // CVV2
//   ccName: "", // CustomerVar
//   ccExpDate: "", //ccmo ccyr

export function mapFormValuesToQGWdbeFields(form) {
  const output = {
    FNAME: form.firstName,
    LNAME: form.lastName,
    BCUST_EMAIL: form.email,
    phone: form.phone,
    BADDR1: form.address,
    BCITY: form.city,
    BSTATE: form.state,
    BZIP1: form.zip,
    BCOUNTRY: form.country,
    amount: form.amount,
    UserVar_beneficiary: form.beneficiary,
    CustomerVar_beneficiary: form.beneficiary,
    UserVar_comments: form.comments,
    CustomerVar_comments: form.comments,
    ccnum: form.ccNumber,
    CVV2: form.cvv,
    CustomerVar: form.ccName,
    invoice_description: `beneficiary: ${form.beneficiary}\ncomments: ${form.comments}\n`,
  };

  return mergeAndCleanObjects([
    output,
    RequiredQGWdbeFields,
    OptionalQGWdbeFields,
  ]);
}

function mergeAndCleanObjects(objects) {
  // Initialize an empty object to hold the merged result
  const merged = {};

  // Iterate over each object in the list
  objects.forEach((obj) => {
    // Iterate over each key in the current object
    Object.keys(obj).forEach((key) => {
      // If the key doesn't exist in the merged object or the existing value is empty,
      // update it with the current object's value (if it's not empty)
      if (!merged.hasOwnProperty(key) || merged[key] === "") {
        if (obj[key] !== "") {
          merged[key] = obj[key];
        }
      }
    });
  });

  // Remove any fields in the merged object that have empty strings
  Object.keys(merged).forEach((key) => {
    if (merged[key] === "") {
      delete merged[key];
    }
  });

  return merged;
}
