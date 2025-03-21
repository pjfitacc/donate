if (process.env.REACT_APP_API_URL) {
  var GWLOGIN = process.env.REACT_APP_API_URL;
  console.log("grabbing from the environment...");
} else {
  console.log("default env...");
  GWLOGIN = "phimar11Dev";
}

const RETURNUrlAPPROVED = "";
const RETURNUrlDECLINED = "";

export const RequiredQGWdbeFields = {
  gwlogin: GWLOGIN,
  amount: "",
  BADDR1: "",
  BZIP1: "",
  post_return_url_approved: RETURNUrlAPPROVED,
  post_return_url_declined: RETURNUrlDECLINED,
};

export const OptionalQGWdbeFields = {
  trans_method: "",
  ccnum: "",
  ccmo: "",
  ccyr: "",
  aba: "",
  checkacct: "",
  ResponseMethod: "",
  BCUST_EMAIL: "",
  override_email_customer: "Y",
  override_trans_email: "",
  RestrictKey: "",
  invoice_num: "",
  invoice_description: "",
  CVV2: "",
  CVVtype: "",
  MAXMIND: "",
  ID: "",
  bg_color: "",
  txt_color: "",
  company_logo: "",
  FNAME: "",
  LNAME: "",
  BCITY: "",
  BSTATE: "",
  BCOUNTRY: "",
  phone: "",
  SFNAME: "",
  SLNAME: "",
  SADDR1: "",
  SCITY: "",
  SSTATE: "",
  SZIP1: "",
  SCOUNTRY: "",
  UserVar: "",
  CustomerVar: "",
  header_receipt: "",
  payment_heading: "",
  page_heading: "",
  cust_id: "",
  override_recur: "",
  OverRideRecureDay: "",
  RID: "",
  initial_amount: "",
  recur_times: "",
};
