import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "../../logic/firebase";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import CurrentRoom from "./CurrentRoom";
import Messages from "./Messages";
import MessageSend from "./MessageSend";

// -- ChatPanel is invoked only when currentRoom is chosen
const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const { currentRoom } = useContext(CurrentRoomContext);
  const [messagesLoaded, setMessagesLoaded] = useState(false);
  const messagesRefFirebase = firebase.database().ref("messages");

  /* 
    --- get reference to rooms variable because callback of addMessagesListener 
    --- is defined once per currentRoom.id change */

  const refTo_messagesVariable = useRef();

  useEffect(() => {
    refTo_messagesVariable.current = messages;
  }); // --- invoked every render

  const getMessagesPerRoomRefFirebase = () =>
    messagesRefFirebase.child(currentRoom.id);

  useEffect(() => {
    addMessagesListener(); // --- will be inoked on currentRoom change

    return () => removeMessagesListener(); // --- will be invoked on Unmount
  }, [currentRoom.id]);

  const addMessagesListener = () => {
    setMessages([]);

    getMessagesPerRoomRefFirebase().on("child_added", snap => {
      /*
       --- refTo_messagesVariable.current is used instead of messages 
       --- because addMessagesListener is invoked only at mount \ room change
       --- and will use messages kind of snapshot which is true only at this instance
       */
      const newMessages = [...refTo_messagesVariable.current];
      newMessages.push(snap.val());
      setMessages(newMessages);
      setMessagesLoaded(true);
      console.log("child_added on: ", newMessages);
    });
  };

  const removeMessagesListener = () => {
    console.log("message listener is removed");
    getMessagesPerRoomRefFirebase().off();
  };

  return (
    <div className="chat-panel">
      <CurrentRoom />
      <Messages messages={messages} messagesLoaded={messagesLoaded} />
      <MessageSend
        getMessagesPerRoomRefFirebase={getMessagesPerRoomRefFirebase}
      />
    </div>
  );
};

export default ChatPanel;
