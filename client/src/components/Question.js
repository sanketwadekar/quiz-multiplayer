import React from "react";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onChoiceChange(e.target.name, e.target.value);
  }

  render() {
    const question = this.props.question;
    return (
      
      <div className="card shadow-sm m-1 p-2">
        <h3>{question.text}</h3>
        <ul className="list-group">
          {question.choices.map((choice) => {
            return (
              <li className="list-group-item" key={choice.id}>
                {choice.id}{" "}
                <input
                  type="radio"
                  onClick={this.handleClick}
                  name={question.id}
                  value={choice.id}
                />{" "}
                {choice.text}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Question;
