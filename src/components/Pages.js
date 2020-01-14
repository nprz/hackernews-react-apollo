import React from "react";

// Components
import CreateLink from "components/CreateLink";
import LinkList from "components/LinkList";
import Login from "components/Login";
import Search from "components/Search";
import { Route, Switch, Redirect } from "react-router-dom";

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
        <Redirect exact from="/" to="/new/1" />
        <Route path="/new/1">
          <LinkList />
        </Route>
        <Route path="/top">
          <LinkList />
        </Route>
        <Route path="/new/:page">
          <LinkList />
        </Route>
        <Route path="/create">
          <CreateLink />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </div>
  );
}
