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
    width: "100vw"
  },
  page: {
    width: "80%"
  }
});

// TODO: adjust trailing commas in prettier
function App() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <div className={classes.page}>
        <Router>
          <Header />
          <Pages />
        </Router>
      </div>
    </div>
  );
}

export default App;
