import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";


const Message = props => {
  const { text, user , timestamp } = props.message;
  const {photoURL , displayName} = user;
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
