import React, { useState } from "react";
import { AUTH_TOKEN } from "../constants";

// Components
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";

// Helpers
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {}
});

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $email) {
      token
    }
  }
`;

export default function Login() {
  const classes = useStyle();
  const history = useHistory();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function saveUserData(token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  function onConfirm(data) {
    const { token } = login ? data.login : data.signup;
    saveUserData(token);
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <h4>{login ? "Login" : "Sign up"}</h4>
      <div>
        {!login && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="text"
          placeholder="put whatever you want here"
        />
      </div>
      <div>
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => onConfirm(data)}
        >
          {mutation => (
            <Button onClick={mutation}>
              {login ? "login" : "create an account"}
            </Button>
          )}
        </Mutation>
        <Button onClick={() => setLogin(!login)}>
          {login ? "need to create an account?" : "already have an account?"}
        </Button>
      </div>
    </div>
  );
}
