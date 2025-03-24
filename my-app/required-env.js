// const dotenv = require("dotenv");
// const fs = require("fs");

// const envFile = `.env.${process.env.NODE_ENV || "development"};`;

// if (fs.existsSync(envFile)) {
//   dotenv.config({ path: envFile });
// } else {
//   console.warn(`Warning: Environment file ${envFile} not found.`);
// }

// // List of required environment variables
// const requiredEnvVars = [
//   "REACT_APP_API_KEY",
//   "REACT_APP_API_URL",
//   "REACT_APP_ENVIRONMENT",
// ];

// // Validate environment variables
// function validateEnv() {
//   const missingVars = requiredEnvVars.filter(
//     (varName) => !process.env[varName]
//   );

//   if (missingVars.length > 0) {
//     console.error(
//       `Missing required environment variables: ${missingVars.join(", ")}`
//     );
//     process.exit(1); // Exit with error code
//   }

//   console.log("All required environment variables are present.");
// }

// validateEnv();

// module.exports = validateEnv;
const dotenv = require("dotenv");
const fs = require("fs");

// Determine which .env file to load based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;

console.log(`Looking for environment file: ${envFile}`);

// Check if the file exists before loading it
if (fs.existsSync(envFile)) {
  console.log(`Loading environment file: ${envFile}`);
  dotenv.config({ path: envFile });
} else {
  console.warn(`Warning: Environment file ${envFile} not found.`);
}

// List of required environment variables
const requiredEnvVars = ["REACT_APP_GWLOGIN"];

// Validate environment variables
function validateEnv() {
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1); // Exit with error code
  }

  console.log("All required environment variables are present.");
}

validateEnv();
