import React from "react";

// Components
import { NavLink } from "react-router-dom";

// Helpers
import { useHistory } from "react-router-dom";
import AUTH_TOKEN from "constants";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "4px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff6600",
    marginBottom: 16
  },
  linkContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  link: {
    paddingRight: 8,
    color: "black",
    textDecoration: "none"
  },
  linkActive: {
    fontWeight: "bold",
    cursor: "default"
  }
});

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className={classes.root}>
      <b>Hacker News</b>
      <div className={classes.linkContainer}>
        <NavLink
          to="/"
          exact
          className={classes.link}
          activeClassName={classes.linkActive}
        >
          new
        </NavLink>
        {authToken && (
          <NavLink
            to="/create"
            className={classes.link}
            activeClassName={classes.linkActive}
          >
            create link
          </NavLink>
        )}
        {authToken ? (
          <div onClick={handleLogout} className={classes.link}>
            logout
          </div>
        ) : (
          <NavLink
            to="/login"
            className={classes.link}
            activeClassName={classes.linkActive}
          >
            login
          </NavLink>
        )}
      </div>
    </div>
  );
}
