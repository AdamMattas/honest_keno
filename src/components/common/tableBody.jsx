import React, { Component } from "react";

class TableBody extends Component {
  createRow = () => {
    return;
  };

  render() {
    return (
      <div className="number-box-container">
        {this.props.data.map(item => (
          <span className="number-box" key={item}>
            {item}
          </span>
        ))}
      </div>
    );
  }
}

export default TableBody;
