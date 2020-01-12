import React from "react";

// Components
import CreateLink from "components/CreateLink";
import LinkList from "components/LinkList";
import Login from "components/Login";
import { Route, Switch } from "react-router-dom";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {}
});

export default function Pages() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/">
          <LinkList />
        </Route>
        <Route path="/create">
          <CreateLink />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}
