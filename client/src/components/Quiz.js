import React from "react";
import Timer from "./Timer";
import Question from "./Question";
import Scorebox from "./Scorebox";
import Results from "./Results";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      end: false,
      isSubmit: false,
    };
    this.scores = undefined;
    this.answer = {};
    this.socket = this.props.socket;
    this.handleChange = this.handleChange.bind(this);
    this.submitResult = this.submitResult.bind(this);
  }

  handleChange(questionid, choice) {
    this.answer[questionid] = choice;
    if (this.state.current === this.props.questions.length) {
      this.submitResult();
    } else {
      this.setState((prevState) => ({
        current: prevState.current + 1,
      }));
    }
  }

  submitResult() {
    this.socket.emit("submit-answer", { answers: this.answer });
    this.setState({isSubmit: true});
    this.socket.on("result", (data) => {
      this.scores = data;
      this.setState({ end: true });
      this.socket.close();
    });
  }

  render() {
    const questions = this.props.questions;
    if (questions.length > 0) {
      return <div className="col-sm-10 mx-auto p-3">
        {
          <Timer
            end={this.state.isSubmit}
            time={this.props.time}
            onTimeup={this.submitResult}
          />
        }
        {(this.state.isSubmit || this.state.end) && (
          <Results total={questions.length} results={this.scores} />
        )}
        {!this.state.isSubmit && (
          <Scorebox total={questions.length} current={this.state.current} />
        )}
        {!this.state.isSubmit && (
          <Question
            question={questions[this.state.current - 1]}
            onChoiceChange={this.handleChange}
          />
        )}
      </div>;
    } else {
      return <h1>Waiting for other players</h1>;
    }
  }
}

export default Quiz;
