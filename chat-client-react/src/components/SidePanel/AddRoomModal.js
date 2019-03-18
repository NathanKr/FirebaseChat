import React, { useState } from "react";
import { Button, Header, Icon, Modal, Form } from "semantic-ui-react";

const AddRoomModal = ({roomsRefFirebase}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const addRoom = () => {
    console.log("addRoom");
    const roomId = roomsRefFirebase.push().key;
    // -- should update be used instead of set ???
    const newRoom = {
      name: roomName,
      description: roomDescription,
      id: roomId
    };
    roomsRefFirebase
      .child(roomId)
      .set(newRoom)
      .then(room => console.log(`success : ${room}`))
      .catch(err => console.log(`error : ${err}`));
  };

  return (
    <Modal
      // trigger={<Button onClick={handleOpen}>+</Button>}
      trigger={<span onClick={handleOpen}>+</span>}
      open={modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content="Add a chat room" />
      <Modal.Content>
        <Form onSubmit={addRoom}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              onChange={evt => setRoomName(evt.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Description"
              onChange={evt => setRoomDescription(evt.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={handleClose} inverted>
          <Icon name="remove" /> Cancel
        </Button>
        <Button
          color="green"
          onClick={() => {
            addRoom();
            handleClose();
          }}
          inverted
        >
          <Icon name="checkmark" /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddRoomModal;
