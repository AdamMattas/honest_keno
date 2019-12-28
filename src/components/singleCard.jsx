import React, { Component } from "react";
import Denomination from "./denomination";

class SingleCard extends Component {
  splitNumbers = () => {
    let section = {
      top: [],
      bottom: []
    };

    this.props.data.map(item =>
      item.number < 41 ? section.top.push(item) : section.bottom.push(item)
    );

    return section;
  };

  render() {
    const split = this.splitNumbers();
    const hint = this.props.cardHint ? " hint-card" : "";

    return (
      <div className="number-box-wrap">
        <div className={`number-box-container container-top${hint}`}>
          {split.top.map(item => (
            <span
              className={
                "number-box" +
                (item.active ? " active" : "") +
                "" +
                (item.selected ? " selected" : "") +
                "" +
                (item.hit ? " hit" : "") +
                "" +
                (item.randomOrder ? ` random-${item.randomOrder}` : "")
              }
              key={item.number}
              onClick={e => this.props.selectToggle(e, item.number)}
            >
              {item.number}
            </span>
          ))}
        </div>

        <Denomination
          denom={this.props.denom}
          changeDenom={this.props.changeDenom}
        />

        <div className={`number-box-container container-bottom${hint}`}>
          {split.bottom.map(item => (
            <span
              className={
                "number-box" +
                (item.active ? " active" : "") +
                "" +
                (item.selected ? " selected" : "") +
                "" +
                (item.hit ? " hit" : "") +
                "" +
                (item.randomOrder ? ` random-${item.randomOrder}` : "")
              }
              key={item.number}
              onClick={e => this.props.selectToggle(e, item.number)}
            >
              {item.number}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default SingleCard;
