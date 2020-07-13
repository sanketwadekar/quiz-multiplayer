import React from 'react';

class Scorebox extends React.Component {
  render(){
    return(
      <div className="">
      <div className="">
        Question {this.props.current} out of {this.props.total} 
      </div>
      </div>
    )
  }
}

export default Scorebox;