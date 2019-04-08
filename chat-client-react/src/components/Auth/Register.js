import React, { useContext, useState } from "react";
import firebase from "../../logic/firebase";
import { Grid, Header, Form, Button, Segment, Icon } from "semantic-ui-react";
import { appIconName, appName } from "../constants";
import { UserContext } from "../../context/UserContext";

const Register = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("natankrasney@gmail.com");
  const [password, setPassword] = useState("123abc");
  const [displayName, setDisplayName] = useState("NathanKr");
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"
  );

  const register = event => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log(`created : ${createdUser}`);
        createdUser.user
          .updateProfile({
            displayName,
            photoURL
          })
          .then(() => {
            console.log(`updated : ${createdUser}`);
            setUser({
              displayName,
              uid: createdUser.user.uid,
              photoURL
            });
            history.push("/");
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: '450px' }}>
        <Header as="h2" color="black" textAlign="center">
          <Icon name={appIconName} /> Register to {appName}
        </Header>
        <Form size="large" onSubmit={register}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              value={displayName} // todo nath remove
              iconPosition="left"
              placeholder="Display name"
              type="text"
              onChange={event => setDisplayName(event.target.value)}
            />
            <Form.Input
              fluid
              icon="mail"
              value={email} // todo nath remove
              iconPosition="left"
              placeholder="E-mail address"
              type="email"
              onChange={event => setEmail(event.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              value={password} // todo nath remove
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={event => setPassword(event.target.value)}
            />
            <Form.Input
              fluid
              icon="file image"
              value={photoURL} // todo nath remove
              iconPosition="left"
              placeholder="Avatar URL"
              type="url"
              onChange={event => setPhotoURL(event.target.value)}
            />
            <Button color="black" fluid size="large" type="submit">
              Register
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
