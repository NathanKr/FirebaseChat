import React, { useContext } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";

const CurrentRoom = () => {
  const { currentRoom } = useContext(CurrentRoomContext);

  return (
    <div className="">
      <h4># {currentRoom.name}</h4>
      <p>(...) users </p>
    </div>
  );
};

export default CurrentRoom;
