import React from "react";

// Components
import Header from "components/Header";
import Pages from "components/Pages";
import { BrowserRouter as Router } from "react-router-dom";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 28,
    width: "100vw"
  }
});

// TODO: adjust trailing commas in prettier
function App() {
  const classes = useStyle();

  return (
    <Router className={classes.root}>
      <Header />
      <Pages />
    </Router>
  );
}

export default App;
