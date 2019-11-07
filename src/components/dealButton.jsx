//import React, { Component } from "react";
import React from "react";

const DealButton = props => {
  const status = props.status === "running" ? " running" : "";

  return (
    <span className={`button${status}`} onClick={props.deal}>
      DEAL
    </span>
  );
};

export default DealButton;
// class DealButton extends Component {
//   //state = { ready: false };
//   render() {
//     return (
//       <span className="button" onClick={this.props.deal}>
//         DEAL
//       </span>
//     );
//   }
// }

// export default DealButton;
