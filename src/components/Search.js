import React, { useState } from "react";

// Components
import Link from "components/Link";
import Button from "@material-ui/core/Button";

// Helpers
import { withApollo } from "react-apollo";
import _get from "lodash/get";
import gql from "graphql-tag";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {}
});

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
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

function Search({ client }) {
  const classes = useStyle();
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("");

  async function executeSearch() {
    const result = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    });
    const returnedLinks = result.data.feed.links;
    setLinks(returnedLinks);
  }

  return (
    <div className={classes.root}>
      <div>
        Search
        <input type="text" onChange={e => setFilter(e.target.value)} />
        <Button onClick={executeSearch}>Ok</Button>
      </div>
      {links.map((link, index) => {
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
          />
        );
      })}
    </div>
  );
}

export default withApollo(Search);
