import React from "react";

// Components
import Link from "./Link";
import { Query } from "react-apollo";

// Helpers
import gql from "graphql-tag";

// Style
import { makeStyles } from "@material-ui/core/styles";

// Query
const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const useStyle = makeStyles({
  root: {}
});

export default function LinkList() {
  const classes = useStyle();

  return (
    <Query query={FEED_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const linksToRender = data.feed.links;

        return (
          <div className={classes.root}>
            {linksToRender.map(link => (
              <Link key={link.id} {...link} />
            ))}
          </div>
        );
      }}
    </Query>
  );
}
