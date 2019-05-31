import React, { Component } from "react";

class SingleCard extends Component {
  splitNumbers = () => {
    let section = {
      top: [],
      bottom: []
    };

    this.props.data.map(item =>
      item.number < 41 ? section.top.push(item) : section.bottom.push(item)
    );

    //console.log("SECTION :", section);
    return section;
  };

  render() {
    const split = this.splitNumbers();

    return (
      <React.Fragment>
        <div className="number-box-container container-top">
          {split.top.map(item => (
            <span
              className={
                "number-box " +
                (item.active ? "active" : "") +
                " " +
                (item.selected ? "selected" : "") +
                " " +
                (item.hit ? "hit" : "")
              }
              key={item.number}
              onClick={e => this.props.numSelect(e, item.number)}
            >
              {item.number}
            </span>
          ))}
        </div>

        <div className="number-box-container container-bottom">
          {split.bottom.map(item => (
            <span
              className={
                "number-box " +
                (item.active ? "active" : "") +
                " " +
                (item.selected ? "selected" : "") +
                " " +
                (item.hit ? "hit" : "")
              }
              key={item.number}
              onClick={e => this.props.numSelect(e, item.number)}
            >
              {item.number}
            </span>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default SingleCard;