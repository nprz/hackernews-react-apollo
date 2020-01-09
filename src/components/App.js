import React from "react";

// Components
import LinkList from "components/LinkList";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 28,
    height: "calc(100vh - 28px)",
    width: "100vw"
  }
});

function App() {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <LinkList />
    </div>
  );
}

export default App;
