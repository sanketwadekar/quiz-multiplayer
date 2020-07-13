import React from "react";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.createRoom = this.createRoom.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.socket = this.props.socket;
  }

  createRoom() {
    const roomname = document.getElementById("room-name").value;
    const name = document.getElementById("name").value;
    if(roomname === "" || name ===""){
      alert("Enter all fields");
      return;
    }
    this.socket.emit("create-room", { room: roomname, name });
    this.socket.on("room-entered", data => {
      this.props.onRoomCreation();
    } );
    this.socket.on("room-error", (data) => {
      alert(data.message);
    });
  }

  joinRoom() {
    const roomname = document.getElementById("room-name").value;
    const name = document.getElementById("name").value;
    if(roomname === "" || name ===""){
      alert("Enter all fields");
      return;
    }
    this.socket.emit("join-room", { room: roomname, name });
    this.socket.on("room-entered", data => {
      this.props.onRoomCreation();
    } );
    this.socket.on("room-error", (data) => {
      alert(data.message);
    });
  }

  render() {
    return (
      <div className="col-sm-5 mx-auto my-5 text-center card p-1 shadow-sm border border-light">
        <h4>Create or join room</h4>
        <label className="py-2">Name
        <input type="text" className="form-control" id="name" placeholder="Enter your name" required={true}></input>
        </label>
        <label className="py-2">Room Name
        <input type="text"  className="form-control"  id="room-name" placeholder="Enter room name" />
        </label>
        <button type="button" className="btn btn-outline-dark" onClick={this.createRoom}>
          Create Room
        </button>
        <br />
        <button type="button" className="btn btn-outline-primary" onClick={this.joinRoom}>
          Join Room
        </button>
      </div>
    );
  }
}

export default Lobby;
