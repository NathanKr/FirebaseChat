import React, { useContext, useState, useEffect, useRef } from "react";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import ModalAddRoom from "./AddRoomModal";
import firebase from "../../logic/firebase";
import Spinner from '../common/Spinner'

const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext);
  const [rooms, setRooms] = useState([]);
  const [roomsLoaded, setRoomsLoaded] = useState(false);
  const refTo_roomsVariable = useRef(); // --- get reference to rooms variable because callback of setInterval is defined once

  useEffect(() => {
    refTo_roomsVariable.current = rooms;
  }); // --- invoked every render

  useEffect(() => {
    /* 
    in general addRoomsListener will be called after every render , 
    but using [] as second argument to useEffect will cause
    it to be called only at mount
    */
    addRoomsListener();

    return () => removeRoomsListener(); // --- will be invoked on Unmount
  }, []); // using [] -> useEffect will be called on mount and unmount ONLY

  const roomsRefFirebase = firebase.database().ref("rooms");

  const addRoomsListener = () => {
    console.log("rooms listener is added");
    roomsRefFirebase.on("child_added", snap => {
      /*
       --- refTo_roomsVariable.current is used instead of rooms 
       --- because addRoomsListener is invoked only at mount
       */
      let newRooms = [...refTo_roomsVariable.current];
      newRooms.push(snap.val());
      setRooms(newRooms);
      setRoomsLoaded(true);
      console.log("child_added on: ", newRooms);
    });
  };

  const removeRoomsListener = () => {
    console.log("rooms listener is removed");
    roomsRefFirebase.off();
  };

  const roomsElements = roomsLoaded ? (
    <ul>
      {rooms.map((item, index) => (
        <li
          onClick={() => {
            setCurrentRoom(rooms[index]);
          }}
          key={index}
        >
          # {item.name}
        </li>
      ))}
    </ul>
  ) : (
    <Spinner content="Loading from firebase..."/>
  );

  return (
    <div>
      <div className="rooms-header">
        <h4>rooms ({rooms.length})</h4>
        <ModalAddRoom roomsRefFirebase={roomsRefFirebase} />
      </div>
      {roomsElements}
    </div>
  );
};

export default Rooms;
