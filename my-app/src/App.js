import React from "react";
import "./App.css";
import "./pages/Checkout";
import Submitted from "pages/Submitted";
import AppTheme from "shared-theme/AppTheme";
import { CssBaseline, Grid2 } from "@mui/material";
import Checkout from "./pages/Checkout";
import "./pages/submitted.css"

function App({ ...props }) {
  const [submitResponse, setSubmitResponse] = React.useState(null);

  const page = () => {
    switch (submitResponse) {
      case null:
        return <Checkout setSubmitResponse={setSubmitResponse} />
      default:
        return <Submitted response={submitResponse} />
    }
  }


  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Grid2
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
        className={submitResponse != null && 'gradientBackground'}
      >
        {page()}
      </Grid2>
    </AppTheme>
  )

}


export default App;
