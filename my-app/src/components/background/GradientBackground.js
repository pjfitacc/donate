import React from "react";
import "./background.css";

export default function GradientBackground({ ChildComponent }) {
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
      <ChildComponent />
    </div>
  );
}
