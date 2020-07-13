import React from "react";

class Results extends React.Component {
  render() {
    const results = this.props.results;
    if (results === undefined) {
      return <h1>Waiting for others to submit</h1>;
    } else {
      return (
        <div className="container">
          <h1>
            {results.winner.result === "draw"
              ? "It's a draw"
              : `Winner is ${results.winner.name}`}
          </h1>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {results.scores.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Results;
