import React, { Component } from "react";

class TableBody extends Component {
  splitNumbers = () => {
    let section = {
      top: [],
      bottom: []
    };

    this.props.data.map(item =>
      item.number < 41 ? section.top.push(item) : section.bottom.push(item)
    );

    console.log("SECTION :", section);
    return section;
  };

  render() {
    const split = this.splitNumbers();
    const top = split.top;
    const bottom = split.bottom;

    return (
      <React.Fragment>
        <div className="number-box-container container-top">
          {top.map(item => (
            <div className="number-box" key={item.number}>
              {item.number}
            </div>
          ))}
        </div>

        <div className="number-box-container container-bottom">
          {bottom.map(item => (
            <div className="number-box" key={item.number}>
              {item.number}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default TableBody;
