import React, { useState, useContext, useEffect } from "react";
import firebase from "../../logic/firebase";
import { appIconName, appName } from "../constants";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import {
  evaluatePasswordError,
  evaluateEmailError,
  isFormValid
} from "../../logic/loginValidators";

import {
  Grid,
  Header,
  Form,
  Button,
  Segment,
  Message,
  Icon
} from "semantic-ui-react";

const Login = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("natankrasney@gmail.com");
  const [password, setPassword] = useState("123abc");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  useEffect(() => {
    setEmailError(evaluateEmailError(email));
    setPasswordError(evaluatePasswordError(email));
  }, []);

  const login = event => {
    event.preventDefault(); // added because we are not sending the page to the srver

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loggedinUser => {
        console.log(loggedinUser.user);
        setUser({
          displayName: loggedinUser.user.displayName,
          uid: loggedinUser.user.uid,
          photoURL: loggedinUser.user.photoURL
        });
        history.push("/");
      })
      .catch(err => {
        console.error(err.message);
        setFirebaseError(err.message);
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          <Icon name={appIconName} /> Login to {appName}
        </Header>
        <Form size="large" onSubmit={login}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              value={email} // use to initialized with state
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              onChange={event => {
                setEmail(event.target.value);
                setEmailError(evaluateEmailError(event.target.value));
              }}
            />
            {emailError ? <Message negative>{emailError}</Message> : ""}
            <Form.Input
              fluid
              icon="lock"
              value={password} // use to initialized with state
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={event => {
                setPassword(event.target.value);
                setPasswordError(evaluatePasswordError(event.target.value));
              }}
            />
            {passwordError ? <Message negative>{passwordError}</Message> : ""}
            <Button
              disabled={!isFormValid(email, password)}
              color="black"
              fluid
              size="large"
              type="submit"
            >
              Login
            </Button>
            {firebaseError ? <Message negative>{firebaseError}</Message> : ""}
          </Segment>
        </Form>

        <Message>
          New to us? <Link to={"/Register"}>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
