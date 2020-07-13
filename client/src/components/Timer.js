import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.props.time,
    };
    this.id = undefined;
    this.changeTime = this.changeTime.bind(this);
  }

  componentDidMount() {
    this.id = setInterval(() => {
      this.changeTime();
    }, 1000);
  }
  
  changeTime() {
    if(this.props.end){
      clearInterval(this.id);
      return;
    }
    if (this.state.time === 0) {
      clearInterval(this.id);
      this.props.onTimeup();
    }else {
    this.setState((prevState) => ({
      time: prevState.time === 0 ? 0 : prevState.time - 1,
    }));
  }
  }

  render() {
    return (
      <div>
        {this.props.end ? (
          <p>Test Submitted</p>
        ) : (
          <p>
            Time remaining: {Math.floor(this.state.time / 60)} min{" "}
            {this.state.time % 60} seconds{" "}
          </p>
        )}
      </div>
    );
  }
}

export default Timer;
