import React from "react";
import Quiz from "./components/Quiz";
import Lobby from "./components/Lobby";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://127.0.0.1:5000");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: false,
      roomCreated: false,
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.questions = [];
    this.time = undefined;
    this.socket = socket;
    this.changeRoomCreated = this.changeRoomCreated.bind(this);
    
  }

  componentDidMount(){
    this.socket.on("questions", (data) => {
      this.getQuestions(data.questions,data.time);
    });
  }
  changeRoomCreated() {
    this.setState({ roomCreated: true });
  }

  getQuestions(questions, time) {
    this.questions = questions;
    this.time = time;
    this.setState({ questions: true });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <a className="navbar-brand" href="#">
            Quiz
          </a>
        </nav>
        {!this.state.roomCreated && (
          <Lobby
            socket={this.socket}
            onRoomCreation={this.changeRoomCreated}
          ></Lobby>
        )}
        {(this.state.questions || this.state.roomCreated) && (
          <Quiz
            questions={this.questions}
            time={this.time}
            socket={this.socket}
          />
        )}
      </div>
    );
  }
}

export default App;
