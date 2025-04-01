import { Card, CardContent } from "@mui/material";
import React from "react";
import "./background.css";

export default function GradientBackground({ cardContent }) {
  return (
    <div
      className="gradientBackground"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          margin: "auto",
          minheight: "50%",
          minWidth: "40%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <CardContent>{cardContent()}</CardContent>
      </Card>
    </div>
  );
}
