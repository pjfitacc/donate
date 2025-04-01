import React, { useState } from "react";
import GradientBackground from "components/background/GradientBackground";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Grid,
  Grid2,
} from "@mui/material"; // Import Material UI components
import PHJLogo from "components/logos/PHJLogo";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

function Bank({ setPaymentType }) {
  const [loading, setLoading] = useState(true); // Track loading state

  const Iframe = () => {
    return (
      <>
        {loading && ( // Show loader while loading
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={50} /> {/* Material UI Loader */}
          </Box>
        )}
        <Grid2
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Full viewport height
            width: "100%",
            position: "relative",
          }}
          direction="column"
          spacing={2}
        >
          <Grid2
            size={2}
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column ",
              gap: { xs: "1rem", md: "2rem" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <PHJLogo sx={{ transform: { md: "scale(1.2)" } }} />
            <Button
              startIcon={<ChevronLeftRoundedIcon />}
              onClick={() => setPaymentType("")}
              variant="outlined" // Changed to outlined variant
              sx={{ display: "flex" }}
            >
              Back to Payment Type Select
            </Button>
          </Grid2>
          <Grid2 size={10} sx={{ position: "relative", height: "65%" }}>
            <iframe
              title="Donation form powered by Zeffy"
              style={{
                position: "relative",
                border: "0",
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                opacity: loading ? 0 : 1, // Hide iframe until loaded
                transition: "opacity 0.3s ease-in-out", // Smooth fade-in effect
              }}
              src="https://www.zeffy.com/embed/donation-form/donation-77"
              allow="payment"
              allowTransparency={true}
              onLoad={() => setLoading(false)} // Hide loader when iframe loads
            />
            {/* </div> */}
          </Grid2>
        </Grid2>
      </>
    );
  };

  return (
    <GradientBackground
      ChildComponent={Iframe}
      className="background.paper"
      style={{ backgroundColor: "hsl(220, 35%, 97%)" }}
    />
  );
}

export default Bank;
