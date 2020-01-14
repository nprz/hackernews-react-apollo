import React from "react";

// Components
import Link from "./Link";
import { Query } from "react-apollo";

// Helpers
import { useLocation, useRouteMatch, useHistory } from "react-router-dom";
import gql from "graphql-tag";
import _get from "lodash/get";
import { LINKS_PER_PAGE } from "../constants";

// Style
import { makeStyles } from "@material-ui/core/styles";

// Query
export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
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
      count
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
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
`;

const NEW_VOTE_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
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
      user {
        id
      }
    }
  }
`;

const useStyle = makeStyles({
  root: {
    backgroundColor: "rgb(246,246,239)"
  },
  pointer: {
    cursor: "pointer"
  }
});

export default function LinkList() {
  const classes = useStyle();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch({
    path: "/new/:page"
  });

  function updateCacheAfterVote(store, createVote, linkId) {
    // getting current state of store
    const data = store.readQuery({ query: FEED_QUERY });

    // finding link in current store
    const votedLink = data.feed.links.find(link => link.id === linkId);
    // setting votes property to votes returned from server
    votedLink.votes = createVote.link.votes;
    store.writeQuery({ query: FEED_QUERY, data });
  }

  function subscribeToNewLinks(subscribeToMore) {
    subscribeToMore({
      // subscription query, the subscription will fire every timr a new link is created
      document: NEW_LINKS_SUBSCRIPTION,
      // describes how the store should updated with the info that was
      // sent by the server after the event occured
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newLink = subscriptionData.data.newLink;
        const exists = prev.feed.links.find(({ id }) => id === newLink.id);
        if (exists) return prev;

        return {
          ...prev,
          feed: {
            links: [...prev.feed.links, newLink],
            count: prev.feed.links.length + 1,
            __typename: prev.feed.__typename
          }
        };
      }
    });
  }

  function subscribeToNewVotes(subscribeToMore) {
    subscribeToMore({
      document: NEW_VOTE_SUBSCRIPTION
    });
  }

  function getQueryVariables() {
    const isNewPage = location.pathname.includes("new");
    const page = parseInt(match.params.page, 10);

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const first = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? "createdAt_DESC" : null;
    return { first, skip, orderBy };
  }

  function getLinksToRender(data) {
    const isNewPage = location.pathname.includes("new");
    if (isNewPage) {
      return data.feed.links;
    }

    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
    return rankedLinks;
  }

  function nextPage(data) {
    const page = parseInt(match.params.page, 10);
    if (page <= data.feed.count / LINKS_PER_PAGE) {
      const nextPage = page + 1;
      history.push(`/new/${nextPage}`);
    }
  }

  function previousPage() {
    const page = parseInt(match.params.page, 10);
    if (page > 1) {
      const previousPage = page - 1;
      history.push(`/new/${previousPage}`);
    }
  }

  return (
    <Query query={FEED_QUERY} variables={getQueryVariables()}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        subscribeToNewLinks(subscribeToMore);
        subscribeToNewVotes(subscribeToMore);

        const linksToRender = getLinksToRender(data);
        const isNewPage = location.pathname.includes("new");
        const pageIndex = match.params.page
          ? (match.params.page - 1) * LINKS_PER_PAGE
          : 0;

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
                  index={index + pageIndex}
                  updateStoreAfterVote={updateCacheAfterVote}
                />
              );
            })}
            {isNewPage && (
              <div>
                <div onClick={previousPage} className={classes.pointer}>
                  previous
                </div>
                <div onClick={() => nextPage(data)} className={classes.pointer}>
                  next
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Query>
  );
}
