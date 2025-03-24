import React from "react";
import "./App.css";
import "./pages/Checkout";
import Submitted from "pages/Submitted";
import AppTheme from "shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import Checkout from "./pages/Checkout";

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

      {page()}

    </AppTheme>
  )

}


export default App;
