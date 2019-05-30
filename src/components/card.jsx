import React, { Component } from "react";
import CardBody from "./cardBody";
import DealButton from "./dealButton";

class Card extends Component {
  state = { numbers: [], kenoNumbers: [], bet: 0 };

  selectNumber = (e, number) => {
    const zeroIndex = number - 1;
    let numbers = [...this.state.kenoNumbers];
    numbers[zeroIndex].selected = true;

    console.log("CLICK :", number, zeroIndex);

    this.setState({ kenoNumbers: numbers });
  };

  deal = () => {
    let random = Math.floor(Math.random() * 80 + 1);
    console.log("DEAL :", random);
  };

  listNumbers(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((item, index) => start + index);
  }

  createNumbers(numbers) {
    const kenoNumbers = [];

    numbers.forEach(num => {
      const kenoNumber = {
        number: num,
        active: false,
        selected: false
      };

      kenoNumbers.push(kenoNumber);
    });

    return kenoNumbers;
  }

  componentDidMount() {
    const numbers = this.listNumbers(1, 80);
    const kenoNumbers = this.createNumbers(numbers);

    this.setState({ numbers, kenoNumbers });
  }

  render() {
    return (
      <React.Fragment>
        <CardBody data={this.state.kenoNumbers} onSelect={this.selectNumber} />
        <DealButton deal={this.deal} />
      </React.Fragment>
    );
  }
}

export default Card;
