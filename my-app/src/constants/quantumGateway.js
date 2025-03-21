import isDev from "utils/DevDetect";

if (process.env.REACT_APP_API_URL) {
  var GWLOGIN = process.env.REACT_APP_API_URL;
  console.log("grabbing from the environment...");
} else {
  console.log("default env...");
  GWLOGIN = "phimar11Dev";
}

const RETURNUrlAPPROVED = "https://www.phjesuits.org/pjf/approved.php";
const RETURNUrlDECLINED = "https://www.phjesuits.org/pjf/declined.html";

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

export const TransQGWdbePOSTUrl = isDev()
  ? "http://localhost:5000/process-payment"
  : "https://secure.quantumgateway.com/cgi/tqgwdbe.php";
export const RequiredTransQGWdbeFields = {
  gwlogin: GWLOGIN,
  trans_method: "",
  trans_type: "",
  amount: "",
  BADDR1: "",
  BZIP1: "",
  BCUST_EMAIL: "",
  override_email_customer: "",
  override_trans_email: "",
};

export const OptionalTransQGWdbeFields = {
  transID: "",
  ccnum: "",
  ccmo: "",
  ccyr: "",
  aba: "",
  checkacct: "",
  BNAME: "",
  CVV2: "",
  CVVtype: "",
  RestrictKey: "",
  Dsep: "",
  MAXMIND: "",
  override_recur: "",
  RID: "",
  initial_amount: "",
  recur_times: "",
  OverRideRecureDay: "",
};
