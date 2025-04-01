import React, { useState } from "react";
import GradientBackground from "components/background/GradientBackground";
import { CircularProgress, Box } from "@mui/material"; // Import Material UI components

function Bank() {
  const [loading, setLoading] = useState(true); // Track loading state

  const Iframe = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          width: "100%",
          position: "relative",
        }}
      >
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

        <iframe
          title="Donation form powered by Zeffy"
          style={{
            position: "relative",
            border: "0",
            width: "60%",
            height: "40%",
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
      </div>
    );
  };

  return <GradientBackground ChildComponent={Iframe} />;
}

export default Bank;
