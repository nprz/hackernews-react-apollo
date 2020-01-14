import React from "react";

// Components
import Link from "./Link";
import { Query } from "react-apollo";

// Helpers
import gql from "graphql-tag";
import _get from "lodash/get";

// Style
import { makeStyles } from "@material-ui/core/styles";

// Query
export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const useStyle = makeStyles({
  root: {
    backgroundColor: "rgb(246,246,239)"
  }
});

export default function LinkList() {
  const classes = useStyle();

  function updateCacheAfterVote(store, createVote, linkId) {
    // getting current state of store
    const data = store.readQuery({ query: FEED_QUERY });

    // finding link in current store
    const votedLink = data.feed.links.find(link => link.id === linkId);
    // setting votes property to votes returned from server
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  }

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const linksToRender = data.feed.links;

        return (
          <div className={classes.root}>
            {linksToRender.map((link, index) => {
              const { id, createdAt, url, description, postedBy, votes } = link;
              return (
                <Link
                  key={id}
                  linkId={id}
                  createdAt={createdAt}
                  url={url}
                  description={description}
                  postedBy={_get(postedBy, ["name"], "Unknown")}
                  votes={votes}
                  index={index}
                  updateStoreAfterVote={updateCacheAfterVote}
                />
              );
            })}
          </div>
        );
      }}
    </Query>
  );
}
