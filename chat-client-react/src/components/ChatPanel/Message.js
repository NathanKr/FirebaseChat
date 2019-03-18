import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";


const Message = props => {
  const { text, displayName, timestamp , photoURL } = props.message;
  const date = moment(timestamp).fromNow();


  return (
    <Comment>
      <Comment.Avatar src={photoURL} />
      <Comment.Content>
        <Comment.Author>{displayName}</Comment.Author>
        <Comment.Metadata>{date}</Comment.Metadata>
        <Comment.Text>{text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
