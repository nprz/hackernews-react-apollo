import React from "react";
import PropTypes from "prop-types";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    border: "1px solid black",
    marginBottom: 16
  }
});

export default function Link({ description, url }) {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <b>{description}</b>
      <div>{url}</div>
    </div>
  );
}

Link.propTypes = {
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
