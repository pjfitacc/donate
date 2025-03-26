import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

function RecurringInput() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
        Create a Recurring Donation
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>W.I.P. RECURRING FUNCTIONALITY IS STILL A WORK IN PROGRESS.</b>
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Default Options:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Monthly, Quarterly, Yearly
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Payment Start Date:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          May 4th 2025 (info ?)
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Frequency:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          Weekly
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          End of Recurring Cycle:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          June 2025
        </Typography>
      </Box>
    </Box>
  );
}

export default RecurringInput;
