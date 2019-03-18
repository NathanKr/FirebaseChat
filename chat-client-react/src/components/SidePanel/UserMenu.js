import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CurrentRoomContext } from "../../context/CurrentRoomContext";
import { Dropdown, Image } from "semantic-ui-react";
import firebase from "../../logic/firebase";

const UserMenu = () => {
  const { user } = useContext(UserContext);
  const { setCurrentRoom } = useContext(CurrentRoomContext);

  return (
    <div>
      <Image src={user.photoURL} avatar />
      <Dropdown text={user.displayName} as="h4">
        <Dropdown.Menu>
          <Dropdown.Item
            disabled
            onClick={() => console.log("clicked on login")}
            text="Login"
          />
          <Dropdown.Item
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(data => {
                  console.log("logout success");
                  setCurrentRoom("");
                })
                .catch(err => console.log("logout failure"));
            }}
            text="Logout"
          />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
