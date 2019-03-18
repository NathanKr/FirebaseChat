import React from "react";
import Message from "./Message";
import {Comment} from 'semantic-ui-react'

const Messages = ({ messages, messagesLoaded }) => {
  const messagesElements = messagesLoaded ? (
    <Comment.Group>
      {messages.map((item, index) => (
          <Message key={index} message={item} />
      ))}
     </Comment.Group>
  ) : (
    <p>loading from firebase...</p>
  );

  return <div className="messages">{messagesElements}</div>;
};

export default Messages;
