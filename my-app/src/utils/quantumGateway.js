import { fakeQGWResponse } from "data/fake";
import {
  OptionalQGWdbeFields,
  OptionalTransQGWdbeFields,
  RequiredQGWdbeFields,
  RequiredTransQGWdbeFields,
  TransQGWdbePOSTUrl,
} from "../constants/quantumGateway";
import { validateQuantumGatewayResponse } from "./validation";

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
    UserVar_name_on_credit_card: form.ccName,
    CustomerVar_name_on_credit_card: form.ccName,
    RID: form.recipeID,
    recur_times: form.timesToRecur,
    override_recur: form.overrideRecurPrice,
    OverRideRecureDay: form.overrideRecurDay,
    UserVar_is_recurring_transaction: form.recipeID?.trim().length > 0,
    CustomerVar_is_recurring_transaction: form.recipeID?.trim().length > 0,
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

export async function createQuantumGatewayTransaction(QGWOptions) {
  // Convert JSON object to URL-encoded format
  const formData = new URLSearchParams();
  Object.entries(QGWOptions).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await getQGWResponse(formData);

    if (!response.ok) {
      throw new Error(
        `Response status from Payment Server: ${response.status}`
      );
    }

    const jsonResponse = await response.json(); // Convert response to JSON

    validateQuantumGatewayResponse(jsonResponse);

    return jsonResponse;
  } catch (error) {
    return error;
  }
}

async function getQGWResponse(formData) {
  if (process.env.REACT_APP_FAKE) {
    return fakeQGWResponse;
  }

  return fetch(TransQGWdbePOSTUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(), // ✅ Correctly formatted body
  });
}

export async function changeTransactionToRecurring(oldTransID, newQGWOptions) {
  // Create New Recurring Transaction that acts as the Single transaction replacement
  delete newQGWOptions.transID;

  if (newQGWOptions.RID?.trim().length === 0 || !newQGWOptions.RID) {
    return new Error("RID is empty. Cannot create recurring transaction.");
  }

  const newRecurringTransaction = await createQuantumGatewayTransaction(
    newQGWOptions
  );

  if (newRecurringTransaction instanceof Error) {
    return newRecurringTransaction;
  }

  // Delete the old transaction
  const voidResponse = deleteQuantumGatewayTransaction(oldTransID);
  if (voidResponse instanceof Error) {
    return voidResponse;
  }

  // Return the new transaction response
  return newRecurringTransaction;
}

async function deleteQuantumGatewayTransaction(transID) {
  const QGWOptions = {
    ...RequiredTransQGWdbeFields,
    ...OptionalTransQGWdbeFields,
  };

  if (transID === "") {
    return new Error("transID is empty. Cannot delete transaction.");
  }

  QGWOptions.transID = transID;
  QGWOptions.trans_type = "VOID";

  return await createQuantumGatewayTransaction(QGWOptions);
}
