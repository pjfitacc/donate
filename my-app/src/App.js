import React from "react";
import "./App.css";
import "./pages/Checkout";
import Checkout from "./pages/Checkout";
import Submitted from "pages/Submitted";

function App() {
  const [submitResponse, setSubmitResponse] = React.useState(null);

  const page = () => {
    switch (submitResponse) {
      case null:
        return <Checkout setSubmitResponse={setSubmitResponse} />
      default:
        return <Submitted response={submitResponse} />
    }
  }


  return page();
}


export default App;
