import React, { useState } from "react";

// Components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Mutation } from "react-apollo";

// Helpers
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {}
});

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

export default function CreateLink() {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const history = useHistory();
  const [url, setUrl] = useState("");

  return (
    <div className={classes.root}>
      <div>
        <TextField
          label="description"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <TextField
          label="url"
          onChange={e => setUrl(e.target.value)}
          value={url}
        />
      </div>
      <Mutation
        mutation={POST_MUTATION}
        variables={{ description, url }}
        onCompleted={() => history.push("/")}
      >
        {postMutation => <Button onClick={postMutation}> create link</Button>}
      </Mutation>
    </div>
  );
}
