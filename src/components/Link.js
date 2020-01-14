import React from "react";
import PropTypes from "prop-types";

// Components
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Mutation } from "react-apollo";

// Helpers
import timeDifferenceForDate from "helpers/timeDifference";
import gql from "graphql-tag";
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

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export default function Link({
  description,
  url,
  index,
  votes,
  postedBy,
  createdAt,
  linkId,
  updateStoreAfterVote
}) {
  const classes = useStyle();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  // look up: Unpacking fields from objects passed as function parameter, if you forget
  // the update function syntax
  return (
    <div className={classes.root}>
      <div className={classes.num}>{index}</div>
      {authToken && (
        <Mutation
          mutation={VOTE_MUTATION}
          variables={{ linkId: linkId }}
          update={(store, { data: { vote } }) =>
            updateStoreAfterVote(store, vote, linkId)
          }
        >
          {voteMutation => <KeyboardArrowUpIcon onClick={voteMutation} />}
        </Mutation>
      )}
      <div className={classes.textContainer}>
        <b>{description}</b>
        <div>{url}</div>
        <div className={classes.voteContainer}>
          <div>{votes.length} votes</div>
          <div>posted by: {postedBy.name}</div>
        </div>
        {timeDifferenceForDate(createdAt)}
      </div>
    </div>
  );
}

Link.propTypes = {
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
