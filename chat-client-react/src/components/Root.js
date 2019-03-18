import React, { useEffect, useState } from "react";
import ChatApp from "./ChatApp";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Switch, Route } from "react-router-dom";
import firebase from "../logic/firebase";
import { withRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CurrentRoomContext } from "../context/CurrentRoomContext";

const Root = props => {
  const [currentRoom, setCurrentRoom] = useState(null);
  // const [user, setUser] = useState({
  //   displayName: "User",//todo nath , remove in production ??
  //   email: "natankrasney@gmail.com", //todo nath , remove in production ??
  //   password: "123abc", //todo nath , remove in production ??
  //   photoURL: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png'
  // });


  const [user, setUser] = useState({
    displayName: "",//todo nath , remove in production ??
    email: "", //todo nath , remove in production ??
    password: "", //todo nath , remove in production ??
    photoURL: ''
  });

  
  useEffect(() => {
    console.log("mount");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user allready logged in -> navigate to /");
        props.history.push("/");
      } else {
        console.log("user is not logged in -> navigate to /Login");
        props.history.push("/Login");
      }
    });
  }, []); // --- [] so invoked on mount only

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
        <Switch>
          <Route exact path="/" component={ChatApp} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
        </Switch>
      </CurrentRoomContext.Provider>
    </UserContext.Provider>
  );
};

export default withRouter(Root);
