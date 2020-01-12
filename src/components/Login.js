import React, { useState } from "react";
import AUTH_TOKEN from "constants";

// Components
import Button from "@material-ui/core/Button";

// Style
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  root: {}
});

export default function Login() {
  const classes = useStyle();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function onConfirm() {}

  function saveUserData() {
    localStorage.setItem(AUTH_TOKEN, token);
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
        <Button>{login ? "login" : "create an account"}</Button>
        <Button>
          {login ? "need to create an account?" : "already have an account?"}
        </Button>
      </div>
    </div>
  );
}
