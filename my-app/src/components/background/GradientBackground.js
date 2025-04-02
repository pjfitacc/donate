import React from "react";
import "./background.css";

export default function GradientBackground({ ChildComponent, ...props }) {
  return (
    <div
      className={props.className ? props.className : "gradientBackground"}
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props.style,
      }}
    >
      <ChildComponent />
    </div>
  );
}
