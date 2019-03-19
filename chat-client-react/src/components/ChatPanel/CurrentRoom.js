import React, { useContext } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";

const CurrentRoom = ({messages}) => {
  const { currentRoom } = useContext(CurrentRoomContext);
  const distinctUsers = [...new Set(messages.map(m => m.user.uid))].length;

  return (
    <div className="">
      <h4># {currentRoom.name}</h4>
      <p>({distinctUsers}) users </p>
    </div>
  );
};

export default CurrentRoom;
