import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { Button } from "semantic-ui-react";
import firebase from '../../logic/firebase'

const MessageSend = ({ getMessagesPerRoomRefFirebase }) => {
  const [messageText, setMessageText] = useState("");
  const { user } = useContext(UserContext);
  const { currentRoom } = useContext(CurrentRoomContext);

  const createMessage = messageId => ({
    id: messageId,
    text: messageText,
    displayName: user.displayName,
    roomId: currentRoom.id,
    timestamp : firebase.database.ServerValue.TIMESTAMP,
    photoURL : user.photoURL
  });

  const sendMessage = () => {
    const messageId = getMessagesPerRoomRefFirebase().push().key;

    // -- should update be used instead of set ???
    const newMessage = createMessage(messageId);
    getMessagesPerRoomRefFirebase()
      .child(messageId)
      .set(newMessage)
      .then(message => {
        setMessageText("");
        console.log(`success : ${message}`);
      })
      .catch(err => console.log(`error : ${err}`));
  };

  return (
    <div className="message-send">
      <input
        value={messageText}
        onChange={evt => setMessageText(evt.target.value)}
        type="text"
      />
      <Button size="medium" circular icon="arrow circle right" onClick={sendMessage}/>
    </div>
  );
};

export default MessageSend;
