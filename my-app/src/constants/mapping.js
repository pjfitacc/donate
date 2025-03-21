import { OptionalQGWdbeFields, RequiredQGWdbeFields } from "./quantumGateway";

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

export function mapFields(input) {
  const output = {
    gwlogin: RequiredQGWdbeFields.gwlogin,
    override_email_customer: OptionalQGWdbeFields.override_email_customer,
    FNAME: input.firstName,
    LNAME: input.lastName,
    BCUST_EMAIL: input.email,
    phone: input.phone,
    BADDR1: input.address,
    BCITY: input.city,
    BSTATE: input.state,
    BZIP1: input.zip,
    BCOUNTRY: input.country,
    amount: input.amount,
    UserVar_beneficiary: input.beneficiary,
    CustomerVar_beneficiary: input.beneficiary,
    UserVar_comments: input.comments,
    CustomerVar_comments: input.comments,
    ccnum: input.ccNumber,
    CVV2: input.cvv,
    CustomerVar: input.ccName,
    invoice_description: `beneficiary: ${input.beneficiary}\ncomments: ${input.comments}\n`,
  };

  return output;
}
