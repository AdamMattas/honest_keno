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
    const hint = this.props.cardHint ? " card--hint" : "";

    return (
      <div className="card">
        <div className={`card__container ${hint}`}>
          {split.top.map(item => (
            <span
              className={
                "card__number" +
                (item.active ? " card__number--active" : "") +
                "" +
                (item.selected ? " card__number--selected" : "") +
                "" +
                (item.hit ? " card__number--hit" : "") +
                "" +
                (item.randomOrder
                  ? ` card__number--random-${item.randomOrder}`
                  : "")
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

        <div className={`card__container ${hint}`}>
          {split.bottom.map(item => (
            <span
              className={
                "card__number" +
                (item.active ? " card__number--active" : "") +
                "" +
                (item.selected ? " card__number--selected" : "") +
                "" +
                (item.hit ? " card__number--hit" : "") +
                "" +
                (item.randomOrder
                  ? ` card__number--random-${item.randomOrder}`
                  : "")
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
