import { Box, Grid2 } from "@mui/material";
import React from "react";
import PHJLogo from "../PHJLogo";
import DonationInfoCard from "./donation-info-card";

function DonationInfoGrid({
  submittedDonation,
  donationErrors,
  donationFormRef,
  editable,
}) {
  return (
    <Grid2
      id="donation-info"
      size={{ sm: 12, md: 5, lg: 4 }}
      sx={{
        display: "flex", // Ensure it shows on xs
        flexDirection: "column",
        backgroundColor: { xs: "transparent", md: "background.paper" }, // Different bg colors
        alignItems: { sm: "center", md: "start" }, // Center content on small screens
        justifyContent: { sm: "center", md: "flex-start" }, // Center content vertically on xs
        borderRight: { xs: "none", md: "1px solid" }, // Add border only on md+
        borderColor: { xs: "none", md: "divider" },
        pt: { xs: 2, md: 4 }, // Adjust padding
        px: { xs: 2, md: 10 }, // Different padding for xs and md+
        gap: { xs: 2, md: 4 }, // Adjust gap
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" }, // Centers on xs
          flexDirection: { xs: "column", sm: "column", md: "" }, // Stack on sm and below, row on md+
          gap: { xs: 2, md: 4 }, // Adds spacing between elements
          alignItems: "center",
          width: { xs: "100%", md: "100%" }, // Makes it smaller on mobile for better spacing
        }}
      >
        <PHJLogo />
        <DonationInfoCard
          submittedDonation={submittedDonation}
          donationErrors={donationErrors}
          ref={donationFormRef}
          editable={editable}
        />
      </Box>
    </Grid2>
  );
}

export default DonationInfoGrid;
