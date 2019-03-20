import React, { useContext } from "react";
import "./ChatApp.css";

import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import { CurrentRoomContext } from "../context/CurrentRoomContext";

const ChatApp = () => {
  const { currentRoom } = useContext(CurrentRoomContext);

  // const emailPaswordSpan = (
  //   <span>
  //     email : {user.email} , password : {user.password}
  //   </span>
  // );

  return (
    <div className="ChatApp">
      {<SidePanel />}
      {currentRoom ? <ChatPanel /> : <h3>Please choose a chat room</h3>}
    </div>
  );
};

export default ChatApp;
