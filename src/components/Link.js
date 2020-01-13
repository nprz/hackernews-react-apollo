import React from "react";
import PropTypes from "prop-types";

// Components
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// Helpers
import timeDifferenceForDate from "helpers/timeDifference";
import AUTH_TOKEN from "constants";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {
    marginBottom: 16
  },
  num: {},
  arrow: {},
  textContainer: {},
  voteContainer: {}
});

export default function Link({
  description,
  url,
  index,
  votes,
  postedBy,
  createdAt
}) {
  const classes = useStyle();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  function voteForLink() {
    return "something";
  }

  return (
    <div className={classes.root}>
      <div className={classes.num}>{index}</div>
      {authToken && (
        <div className={classes.arrow}>
          <KeyboardArrowUpIcon onClick={voteForLink} />
        </div>
      )}
      <div className={classes.textContainer}>
        <b>{description}</b>
        <div>{url}</div>
        <div className={classes.voteContainer}>
          <div>{votes.length} votes</div>
          <div>posted by: {postedBy.name}</div>
        </div>
        {timeDifferenceForDate(createAt)}
      </div>
    </div>
  );
}

Link.propTypes = {
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
