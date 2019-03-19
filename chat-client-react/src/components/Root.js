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
 
  const [user, setUser] = useState({
    displayName: "", 
    uid : "",
    photoURL: ""
  });

  useEffect(() => {
    console.log("mount");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user allready logged in -> navigate to /");
        const { displayName, uid, photoURL } = user;
        console.log('onAuthStateChanged',displayName,photoURL);
        setUser({ displayName, uid , photoURL });
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
