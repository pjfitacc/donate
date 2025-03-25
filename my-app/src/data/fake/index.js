// Define your fakeFilledForm object
export const fakeFilledForm = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  address: "123 Fake St",
  city: "Faketown",
  state: "CA",
  zip: "12345",
  country: "USA",
  acceptTerms: true,
  amount: 100,
  beneficiary: "Ateneo de Manila University",
  comments: "This is a fake donation",
  ccNumber: "4111111111111111",
  cvv: "999",
  ccName: "John Doe",
  ccExpDate: "12/25",
};

// TransparentQGWDB Engine Response: https://www.quantumgateway.com/view_developer.php?Cat1=3
// Assuming that the transaction is type SALES which our organization currently has set as of 3/24/25
// A SALE, same as CREDIT, is a charge
// and will bypass the Processing
// Settings. SALES does not use AVS
// and CVV2 settings. 
// https://www.quantumgateway.com/files/QGW-Non-Interactive_API.pdf
const fakeApprovedQGWJsonResponse = {
  quantumGatewayTransactionResponse: [
    "APPROVED",
    "019452",
    "652145",
    "",
    "",
    "",
    "VI",
    "1111",
    "0",
  ],
};

const fakeDeclinedQGWJsonResponse = {
  quantumGatewayTransactionResponse: [
    "DECLINED",
    "019452",
    "652145",
    "N",
    "N",
    "0.6",
    "INVALID EXP DATE",
    "205",
  ],
};

const jsonObject = fakeApprovedQGWJsonResponse;
const jsonString = JSON.stringify(jsonObject);

export const fakeQGWResponse = new Response(jsonString, {
  status: 200,
  headers: {
    "Content-Type": "application/json",
  },
});
