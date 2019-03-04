import React, { Component } from "react";
import "./App.css";
import firebase from "./firebase";

class App extends Component {
  email = "natankrasney@gmail.com";
  password = "123abc";
  roomsRef = firebase.database().ref("rooms");

  addListeners = () => {
    this.roomsRef.on("child_added", snap => {
      console.log("child_added on: ", snap);
    });

    this.roomsRef.on("value", data => {
      console.log(data.val());
    });
  };

  removeListeners = () => {
    this.roomsRef.off("child_added", snap => {
      console.log("child_added off: ", snap);
    });
    this.roomsRef.off("value", snap => {
      console.log("value off: ", snap);
    });
  };

  addRoom = () => {
    this.roomsRef
      .child("1")
      .set({ name: "room1" })
      .then(room => console.log(`success : ${room}`))
      .catch(err => console.log(`error : ${err}`));
  };

  register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(createdUser => {
        console.log(createdUser);
      })
      .catch(err => {
        console.error(err);
      });
  };

  login = () =>
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(createdUser => {
        console.log(createdUser);
      })
      .catch(err => {
        console.error(err);
      });

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.register}>Register</button>
        <button onClick={this.login}>Login</button>
        <button onClick={this.addRoom}>Add room</button>
      </div>
    );
  }
}

export default App;
